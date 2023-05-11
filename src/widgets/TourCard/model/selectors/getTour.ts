import { TourType } from '../../../Searchbar/model/types/searchbar';
import image11 from '../../../../shared/assets/hotels/111.jpg';

export const getTour = (): TourType => {
  const tour: TourType = {
    id: 1,
    name: 'AKTEA BEACH VILLAGE',
    cityDeparture: 'Moscow',
    cityArrival: 'Ayia Napa',
    hotel: 'AKTEA BEACH VILLAGE',
    dateDeparture: '20.05.2023',
    dateArrival: '27.05.2023',
    price: 1198,
    currency: '$',
    guests: 2,
    description:
      'Modern cozy apartment hotel. Located in a picturesque secluded bay, close to the golden beaches of Sandy Bay and Nissi. Nearby are bars, restaurants and shops. Here you will find peace and solitude along with the hectic life of an international resort. Recommended for a relaxing family holiday, as well as for beach lovers.',
    image: image11,
    rating: 5
  };
  return tour;
};
