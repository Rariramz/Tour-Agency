import { Tour } from '../../tour/model/types/types';

export type Reservation = {
  id: number;
  userId: number;
  tourId: number;
  departureDate: string;
  nightsAmount: number;
  price: number;
  currency: string;
  guests: number;
  status: string;
  tour: Tour;
};
