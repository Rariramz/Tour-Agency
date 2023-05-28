import image111 from '../../../../shared/assets/hotels/111.jpg';
import image2 from '../../../../shared/assets/hotels/2.jpg';
import { TourType } from '../../../Searchbar/model/types/searchbar';

export const getDoneTours = () => {
  const doneTours: TourType[] = [
    {
      id: 1,
      name: 'AKTEA BEACH VILLAGE',
      cityDeparture: 'Warsaw',
      cityArrival: 'Ayia Napa',
      hotel: 'AKTEA BEACH VILLAGE',
      datesDeparture: ['2023.05.20', '2023.05.23'],
      nightsAmounts: [5, 6, 7, 8, 9, 10],
      price: 1198,
      currency: '$',
      guests: 2,
      description:
        'Modern cozy apartment hotel. Located in a picturesque secluded bay, close to the golden beaches of Sandy Bay and Nissi. Nearby are bars, restaurants and shops. Here you will find peace and solitude along with the hectic life of an international resort. Recommended for a relaxing family holiday, as well as for beach lovers.',
      image: image111,
      rating: 5
    },
    {
      id: 2,
      name: 'THRONE BEACH RESORT & SPA',
      cityDeparture: 'Warsaw',
      cityArrival: 'Orensehir, Side',
      hotel: 'THRONE BEACH RESORT & SPA',
      datesDeparture: ['2023.05.19', '2023.05.22', '2023.05.27'],
      nightsAmounts: [7, 8, 9, 10],
      price: 798,
      currency: '$',
      guests: 2,
      description:
        'The hotel  consists of one 6-storey building and a complex  of two-storey buildings "club" 150 meters from the main building and 450 meters from the sea.',
      image: image2,
      rating: 4.8
    }
  ];
  return doneTours;
};
