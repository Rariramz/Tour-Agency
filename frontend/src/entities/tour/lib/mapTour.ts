import { type TourDto } from '../api/types'
import { type Tour } from '../model/types/types'

export function mapTour(dto: TourDto): Tour {
  return {
    cityDepartureId: dto.city_departure_id,
    cityArrivalId: dto.city_arrival_id,
    countryDepartureId: dto.country_departure_id,
    countryArrivalId: dto.country_arrival_id,
    hotelId: dto.hotel_id,
    datesDeparture: dto.dates_departure,
    nightsAmount: dto.nights_amount,
    price: dto.price,
    currency: dto.currency,
    guests: dto.guests,
    description: dto.description,
    rating: dto.rating,
    image: dto.image_id,
  }
}