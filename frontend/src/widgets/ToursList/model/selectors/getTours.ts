import image1 from '../../../../shared/assets/hotels/1.jpg';
import image111 from '../../../../shared/assets/hotels/111.jpg';
import image2 from '../../../../shared/assets/hotels/2.jpg';
import image22 from '../../../../shared/assets/hotels/22.jpg';
import image3 from '../../../../shared/assets/hotels/3.jpg';
import image33 from '../../../../shared/assets/hotels/33.jpg';
import { TourType } from '../types/searchbar';

export const getTours = () => {
  const toursList: TourType[] = [
    // {
    //   id: 1,
    //   name: 'AKTEA BEACH VILLAGE',
    //   cityDeparture: 'Warsaw',
    //   cityArrival: 'Ayia Napa',
    //   hotel: 'AKTEA BEACH VILLAGE',
    //   datesDeparture: ['2023.05.20', '2023.05.23'],
    //   nightsAmounts: [5, 6, 7, 8, 9, 10],
    //   price: 1198,
    //   currency: '$',
    //   guests: 2,
    //   description:
    //     'Modern cozy apartment hotel. Located in a picturesque secluded bay, close to the golden beaches of Sandy Bay and Nissi. Nearby are bars, restaurants and shops. Here you will find peace and solitude along with the hectic life of an international resort. Recommended for a relaxing family holiday, as well as for beach lovers.',
    //   image: image111,
    //   rating: 5
    // },
    // // {
    // //   id: 2,
    // //   name: 'THRONE BEACH RESORT & SPA',
    // //   cityDeparture: 'Warsaw',
    // //   cityArrival: 'Orensehir, Side',
    // //   hotel: 'THRONE BEACH RESORT & SPA',
    // //   datesDeparture: ['2023.05.19', '2023.05.22', '2023.05.27'],
    // //   nightsAmounts: [7, 8, 9, 10],
    // //   price: 798,
    // //   currency: '$',
    // //   guests: 2,
    // //   description:
    // //     'The hotel  consists of one 6-storey building and a complex  of two-storey buildings "club" 150 meters from the main building and 450 meters from the sea.',
    // //   image: image2,
    // //   rating: 4.8
    // // },
    // {
    //   id: 2,
    //   name: 'BELLIS DELUXE HOTEL',
    //   cityDeparture: 'Warsaw',
    //   cityArrival: 'Belek',
    //   hotel: 'BELLIS DELUXE HOTEL',
    //   datesDeparture: ['2023.06.09', '2023.06.12', '2023.06.15'],
    //   nightsAmounts: [7, 8, 9, 10],
    //   price: 3352,
    //   currency: '$',
    //   guests: 2,
    //   description:
    //     'The hotel consists of a 6-storey Main Building, a 2-storey Mimosa Garden Building, three 3-storey Camelia  Garden buildings, 3-storey Jasmine Lake Houses, two 3-storey Camelia Superior Family cottages and eight Villa Bellis and one Villa Diamond.',
    //   image: image3,
    //   rating: 5
    // },
    // {
    //   id: 3,
    //   name: 'AKTEA BEACH VILLAGE',
    //   cityDeparture: 'Moscow',
    //   cityArrival: 'Ayia Napa',
    //   hotel: 'AKTEA BEACH VILLAGE',
    //   datesDeparture: ['2023.06.17', '2023.06.19', '2023.06.21'],
    //   nightsAmounts: [6, 7, 8, 9, 10],
    //   price: 1198,
    //   currency: '$',
    //   guests: 2,
    //   description:
    //     'Modern cozy apartment hotel. Located in a picturesque secluded bay, close to the golden beaches of Sandy Bay and Nissi. Nearby are bars, restaurants and shops. Here you will find peace and solitude along with the hectic life of an international resort. Recommended for a relaxing family holiday, as well as for beach lovers.',
    //   image: image1,
    //   rating: 4.9
    // },
    // // {
    // //   id: 5,
    // //   name: 'THRONE BEACH RESORT & SPA',
    // //   cityDeparture: 'Warsaw',
    // //   cityArrival: 'Side',
    // //   hotel: 'THRONE BEACH RESORT & SPA',
    // //   datesDeparture: ['2023.06.17', '2023.06.19', '2023.06.21'],
    // //   nightsAmounts: [7, 8, 9, 10],
    // //   price: 1026,
    // //   currency: '$',
    // //   guests: 2,
    // //   description:
    // //     'The hotel  consists of one 6-storey building and a complex  of two-storey buildings "club" 150 meters from the main building and 450 meters from the sea.',
    // //   image: image22,
    // //   rating: 4.8
    // // },
    // {
    //   id: 4,
    //   name: 'BELLIS DELUXE HOTEL',
    //   cityDeparture: 'Vilnus',
    //   cityArrival: 'Belek',
    //   hotel: 'BELLIS DELUXE HOTEL',
    //   datesDeparture: ['2023.06.17', '2023.06.19', '2023.06.21'],
    //   nightsAmounts: [7, 8, 9, 10],
    //   price: 2082,
    //   currency: '$',
    //   guests: 2,
    //   description:
    //     'The hotel consists of a 6-storey Main Building, a 2-storey Mimosa Garden Building, three 3-storey Camelia  Garden buildings, 3-storey Jasmine Lake Houses, two 3-storey Camelia Superior Family cottages and eight Villa Bellis and one Villa Diamond.',
    //   image: image33,
    //   rating: 5
    // },
    // {
    //   id: 5,
    //   name: 'AKTEA BEACH VILLAGE',
    //   cityDeparture: 'Warsaw',
    //   cityArrival: 'Ayia Napa',
    //   hotel: 'AKTEA BEACH VILLAGE',
    //   datesDeparture: ['2023.05.20', '2023.05.23'],
    //   nightsAmounts: [5, 6, 7, 8, 9, 10],
    //   price: 1198,
    //   currency: '$',
    //   guests: 2,
    //   description:
    //     'Modern cozy apartment hotel. Located in a picturesque secluded bay, close to the golden beaches of Sandy Bay and Nissi. Nearby are bars, restaurants and shops. Here you will find peace and solitude along with the hectic life of an international resort. Recommended for a relaxing family holiday, as well as for beach lovers.',
    //   image: image111,
    //   rating: 5
    // },
    // // {
    // //   id: 2,
    // //   name: 'THRONE BEACH RESORT & SPA',
    // //   cityDeparture: 'Warsaw',
    // //   cityArrival: 'Orensehir, Side',
    // //   hotel: 'THRONE BEACH RESORT & SPA',
    // //   datesDeparture: ['2023.05.19', '2023.05.22', '2023.05.27'],
    // //   nightsAmounts: [7, 8, 9, 10],
    // //   price: 798,
    // //   currency: '$',
    // //   guests: 2,
    // //   description:
    // //     'The hotel  consists of one 6-storey building and a complex  of two-storey buildings "club" 150 meters from the main building and 450 meters from the sea.',
    // //   image: image2,
    // //   rating: 4.8
    // // },
    // {
    //   id: 6,
    //   name: 'BELLIS DELUXE HOTEL',
    //   cityDeparture: 'Warsaw',
    //   cityArrival: 'Belek',
    //   hotel: 'BELLIS DELUXE HOTEL',
    //   datesDeparture: ['2023.06.09', '2023.06.12', '2023.06.15'],
    //   nightsAmounts: [7, 8, 9, 10],
    //   price: 3352,
    //   currency: '$',
    //   guests: 2,
    //   description:
    //     'The hotel consists of a 6-storey Main Building, a 2-storey Mimosa Garden Building, three 3-storey Camelia  Garden buildings, 3-storey Jasmine Lake Houses, two 3-storey Camelia Superior Family cottages and eight Villa Bellis and one Villa Diamond.',
    //   image: image3,
    //   rating: 5
    // },
    // {
    //   id: 7,
    //   name: 'AKTEA BEACH VILLAGE',
    //   cityDeparture: 'Moscow',
    //   cityArrival: 'Ayia Napa',
    //   hotel: 'AKTEA BEACH VILLAGE',
    //   datesDeparture: ['2023.06.17', '2023.06.19', '2023.06.21'],
    //   nightsAmounts: [6, 7, 8, 9, 10],
    //   price: 1198,
    //   currency: '$',
    //   guests: 2,
    //   description:
    //     'Modern cozy apartment hotel. Located in a picturesque secluded bay, close to the golden beaches of Sandy Bay and Nissi. Nearby are bars, restaurants and shops. Here you will find peace and solitude along with the hectic life of an international resort. Recommended for a relaxing family holiday, as well as for beach lovers.',
    //   image: image1,
    //   rating: 4.9
    // },
    // // {
    // //   id: 5,
    // //   name: 'THRONE BEACH RESORT & SPA',
    // //   cityDeparture: 'Warsaw',
    // //   cityArrival: 'Side',
    // //   hotel: 'THRONE BEACH RESORT & SPA',
    // //   datesDeparture: ['2023.06.17', '2023.06.19', '2023.06.21'],
    // //   nightsAmounts: [7, 8, 9, 10],
    // //   price: 1026,
    // //   currency: '$',
    // //   guests: 2,
    // //   description:
    // //     'The hotel  consists of one 6-storey building and a complex  of two-storey buildings "club" 150 meters from the main building and 450 meters from the sea.',
    // //   image: image22,
    // //   rating: 4.8
    // // },
    // {
    //   id: 8,
    //   name: 'BELLIS DELUXE HOTEL',
    //   cityDeparture: 'Vilnus',
    //   cityArrival: 'Belek',
    //   hotel: 'BELLIS DELUXE HOTEL',
    //   datesDeparture: ['2023.06.17', '2023.06.19', '2023.06.21'],
    //   nightsAmounts: [7, 8, 9, 10],
    //   price: 2082,
    //   currency: '$',
    //   guests: 2,
    //   description:
    //     'The hotel consists of a 6-storey Main Building, a 2-storey Mimosa Garden Building, three 3-storey Camelia  Garden buildings, 3-storey Jasmine Lake Houses, two 3-storey Camelia Superior Family cottages and eight Villa Bellis and one Villa Diamond.',
    //   image: image33,
    //   rating: 5
    // }
  ];
  return toursList;
};
