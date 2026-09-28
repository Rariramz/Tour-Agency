import { TOURS_REPOSITORY } from '../constants';
import { Tour } from './tour.entity';

export const toursProviders = [
  {
    provide: TOURS_REPOSITORY,
    useValue: Tour,
  },
];