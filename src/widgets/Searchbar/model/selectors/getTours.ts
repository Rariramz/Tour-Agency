import image1 from '../../../../shared/assets/hotels/1.jpg';
import image11 from '../../../../shared/assets/hotels/11.jpg';
import image2 from '../../../../shared/assets/hotels/2.jpg';
import image22 from '../../../../shared/assets/hotels/22.jpg';
import image3 from '../../../../shared/assets/hotels/3.jpg';
import image33 from '../../../../shared/assets/hotels/33.jpg';
import { TourType } from '../types/searchbar';

export const getTours = () => {
  const toursList: TourType[] = [
    {
      id: 1,
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
    },
    {
      id: 2,
      cityDeparture: 'Moscow',
      cityArrival: 'Orensehir, Side',
      hotel: 'THRONE BEACH RESORT & SPA',
      dateDeparture: '19.05.2023',
      dateArrival: '26.05.2023',
      price: 798,
      currency: '$',
      guests: 2,
      description:
        'The hotel  consists of one 6-storey building and a complex  of two-storey buildings "club" 150 meters from the main building and 450 meters from the sea.',
      image: image2,
      rating: 4.8
    },
    {
      id: 3,
      cityDeparture: 'Moscow',
      cityArrival: 'Belek',
      hotel: 'BELLIS DELUXE HOTEL',
      dateDeparture: '09.06.2023',
      dateArrival: '16.06.2023',
      price: 3352,
      currency: '$',
      guests: 2,
      description:
        'The hotel consists of a 6-storey Main Building, a 2-storey Mimosa Garden Building, three 3-storey Camelia  Garden buildings, 3-storey Jasmine Lake Houses, two 3-storey Camelia Superior Family cottages and eight Villa Bellis and one Villa Diamond.',
      image: image3,
      rating: 5
    },
    {
      id: 4,
      cityDeparture: 'Moscow',
      cityArrival: 'Ayia Napa',
      hotel: 'AKTEA BEACH VILLAGE',
      dateDeparture: '26.05.2023',
      dateArrival: '04.06.2023',
      price: 1198,
      currency: '$',
      guests: 2,
      description:
        'Modern cozy apartment hotel. Located in a picturesque secluded bay, close to the golden beaches of Sandy Bay and Nissi. Nearby are bars, restaurants and shops. Here you will find peace and solitude along with the hectic life of an international resort. Recommended for a relaxing family holiday, as well as for beach lovers.',
      image: image1,
      rating: 4.9
    },
    {
      id: 5,
      cityDeparture: 'Warsaw',
      cityArrival: 'Side',
      hotel: 'THRONE BEACH RESORT & SPA',
      dateDeparture: '28.06.2023',
      dateArrival: '07.07.2023',
      price: 1026,
      currency: '$',
      guests: 2,
      description:
        'The hotel  consists of one 6-storey building and a complex  of two-storey buildings "club" 150 meters from the main building and 450 meters from the sea.',
      image: image22,
      rating: 4.8
    },
    {
      id: 6,
      cityDeparture: 'Vilnus',
      cityArrival: 'Belek',
      hotel: 'BELLIS DELUXE HOTEL',
      dateDeparture: '07.07.2023',
      dateArrival: '15.07.2023',
      price: 2082,
      currency: '$',
      guests: 2,
      description:
        'The hotel consists of a 6-storey Main Building, a 2-storey Mimosa Garden Building, three 3-storey Camelia  Garden buildings, 3-storey Jasmine Lake Houses, two 3-storey Camelia Superior Family cottages and eight Villa Bellis and one Villa Diamond.',
      image: image33,
      rating: 5
    }
  ];
  return toursList;
};
