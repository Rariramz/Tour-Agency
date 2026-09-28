import { CreateTourDto } from '../../../entities/tour/api/types';
export const mapToCreateTourDto = (data: {
  cityDeparture: string;
  cityArrival: string;
  countryDeparture: string;
  countryArrival: string;
  hotelId: string;
  datesDeparture: string[];
  nightsAmount: string;
  price: string;
  currency: string;
  guests: string;
  description: string;
  rating: string;
}): CreateTourDto => ({
  cityDepartureId: String(data.cityDeparture),
  cityArrivalId: String(data.cityArrival),
  countryDepartureId: String(data.countryDeparture),
  countryArrivalId: String(data.countryArrival),
  hotelId: data.hotelId,
  datesDeparture: data.datesDeparture,
  nightsAmount: Number(data.nightsAmount),
  price: Number(data.price),
  currency: data.currency.toUpperCase(),
  guests: Number(data.guests),
  description: data.description,
  rating: Number(data.rating)
});
