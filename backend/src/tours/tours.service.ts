import {
  BadRequestException,
  ConflictException,
  Injectable,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { Tour } from './tour.entity';
import { TOURS_REPOSITORY, UserTourStatuses } from '../constants';
import { UpdateTourDto } from './dto/update-tour.dto';
import { UserTour } from './user-tours.entity';
import { BookTourDto } from './dto/book-tour.dto';
import { CountriesService } from 'src/countries/countries.service';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ToursService {
  constructor(
    @Inject(TOURS_REPOSITORY)
    private toursRepository: typeof Tour,
    private countriesService: CountriesService,
    private filesService: FilesService,
  ) {}

  async findAllTours(): Promise<Tour[]> {
    return this.toursRepository.findAll<Tour>();
  }

  async findOneTour(id: number): Promise<Tour> {
    const tour = await this.toursRepository.findOne({
      where: { id },
    });
    if (!tour) throw new NotFoundException('Tour not found');
    return tour;
  }

  toResponse(tour: Tour) {
    const departure = this.countriesService.findCityById(
      Number(tour.cityDepartureId),
    );
    const arrival = this.countriesService.findCityById(
      Number(tour.cityArrivalId),
    );
    return {
      ...tour.toJSON(),
      cityDeparture: departure?.name ?? 'Unknown departure',
      cityArrival: arrival?.name ?? 'Unknown destination',
      countryArrival: arrival?.country_name ?? '',
      destination: arrival
        ? { lat: Number(arrival.latitude), lng: Number(arrival.longitude) }
        : null,
    };
  }

  async createTour(createTourDto: CreateTourDto, image: any): Promise<Tour> {
    const fileName = await this.filesService.createFile(image);
    const tour = await this.toursRepository.create<Tour>({
      ...createTourDto,
      image: fileName,
    });
    return tour;
  }

  async updateTour(id: number, updateTourDto: UpdateTourDto): Promise<Tour> {
    const tour = await this.findOneTour(id);
    return tour.update(updateTourDto);
  }

  async deleteTour(id: number): Promise<number> {
    return this.toursRepository.destroy({
      where: { id },
    });
  }

  async bookTour(userId: number, tourId: number, bookTourDto: BookTourDto) {
    const tour = await this.findOneTour(tourId);
    if (!tour.datesDeparture.includes(bookTourDto.departureDate)) {
      throw new BadRequestException(
        'Selected departure is not available for this tour',
      );
    }
    if (bookTourDto.departureDate < new Date().toISOString().slice(0, 10)) {
      throw new BadRequestException('Departure date must not be in the past');
    }
    const duplicate = await UserTour.findOne({
      where: { userId, tourId, departureDate: bookTourDto.departureDate },
    });
    if (duplicate)
      throw new ConflictException(
        'This tour is already booked for the selected date',
      );

    const reservation = await UserTour.create({
      userId,
      tourId,
      departureDate: bookTourDto.departureDate,
      nightsAmount: tour.nightsAmount,
      price: Math.ceil((tour.price * bookTourDto.guests) / tour.guests),
      currency: tour.currency,
      guests: bookTourDto.guests,
      status: UserTourStatuses.BOOKED,
    } as UserTour);
    reservation.tour = tour;
    return this.reservationToResponse(reservation);
  }

  async findUserReservations(userId: number) {
    const reservations = await UserTour.findAll({
      where: { userId },
      include: [Tour],
      order: [['id', 'DESC']],
    });
    return reservations.map((reservation) =>
      this.reservationToResponse(reservation),
    );
  }

  async cancelReservation(userId: number, reservationId: number) {
    const reservation = await UserTour.findOne({
      where: { id: reservationId, userId },
      include: [Tour],
    });
    if (!reservation) throw new NotFoundException('Reservation not found');
    const response = this.reservationToResponse(reservation);
    await reservation.destroy();
    return response;
  }

  private reservationToResponse(reservation: UserTour) {
    const response = reservation.toJSON();
    return {
      ...response,
      tour: reservation.tour ? this.toResponse(reservation.tour) : undefined,
    };
  }
}
