import { Injectable, Inject, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { Tour } from './tour.entity';
import { TOURS_REPOSITORY, UserTourStatuses } from '../constants';
import { UpdateTourDto } from './dto/update-tour.dto';
import { UsersService } from 'src/users/users.service';
import { UserTour } from './user-tours.entity';
import { BookTourDto } from './dto/book-tour.dto';
import { LikeTourDto } from './dto/like-tour.dto';
import { PayUserTourDto } from './dto/pay-user-tour.dto';
import { CountriesService } from 'src/countries/countries.service';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ToursService {
  constructor(
    @Inject(TOURS_REPOSITORY)
    private toursRepository: typeof Tour,
    private usersService: UsersService,
    private countriesService: CountriesService,
    private filesService: FilesService
  ) {}

  async findAllTours(): Promise<Tour[]> {
    return this.toursRepository.findAll<Tour>();
  }

  async findOneTour(id: number): Promise<Tour> {
    const tour = await this.toursRepository.findOne({
      where: { id }
    });
    if (!tour) throw new NotFoundException('Tour not found');
    return tour;
  }

  toResponse(tour: Tour) {
    const departure = this.countriesService.findCityById(Number(tour.cityDepartureId));
    const arrival = this.countriesService.findCityById(Number(tour.cityArrivalId));
    return {
      ...tour.toJSON(),
      cityDeparture: departure?.name ?? 'Unknown departure',
      cityArrival: arrival?.name ?? 'Unknown destination',
      countryArrival: arrival?.country_name ?? '',
      destination: arrival ? { lat: Number(arrival.latitude), lng: Number(arrival.longitude) } : null,
    };
  }

  async createTour(createTourDto: CreateTourDto, image: any): Promise<Tour> {
    const fileName = await this.filesService.createFile(image);
    const tour = await this.toursRepository.create<Tour>({...createTourDto, image: fileName});
    return tour;
  }

  async updateTour(id: number, updateTourDto: UpdateTourDto): Promise<Tour> {
    const tour = await this.findOneTour(id);
    return tour.update(updateTourDto);
  };

  async deleteTour(id: number): Promise<number> {
    return this.toursRepository.destroy({
      where: { id }
    })
  }

  async likeTour(id: number, likeTourDto: LikeTourDto) {}

  async bookTour(tourId: number, bookTourDto: BookTourDto): Promise<UserTour> {
    const user = await this.usersService.getUserByEmail(bookTourDto.userEmail);
    const tour = await this.findOneTour(tourId);
    if (user && tour) {
      const userTour = new UserTour();
      userTour.userId = user.id;
      userTour.tourId = tour.id;
      userTour.departureDate = bookTourDto.dateDeparture;
      userTour.nightsAmount = bookTourDto.nightsAmount;
      userTour.price = bookTourDto.price;
      userTour.currency = bookTourDto.currency;
      userTour.guests = bookTourDto.guests;
      userTour.status = UserTourStatuses.NOT_PAYED;
      await userTour.save();

      return userTour;
    }
    throw new HttpException('User or tour is not found', HttpStatus.NOT_FOUND);
  }

  async payTour(payUserTourDto: PayUserTourDto) {}
}
