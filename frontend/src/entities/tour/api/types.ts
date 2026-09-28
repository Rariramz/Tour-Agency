import { Tour } from '../model/types/types';
export type TourDto = Tour;
export type CreateTourDto = Pick<
  Tour,
  | 'cityDepartureId'
  | 'cityArrivalId'
  | 'countryDepartureId'
  | 'countryArrivalId'
  | 'hotelId'
  | 'datesDeparture'
  | 'nightsAmount'
  | 'price'
  | 'currency'
  | 'guests'
  | 'description'
  | 'rating'
>;
