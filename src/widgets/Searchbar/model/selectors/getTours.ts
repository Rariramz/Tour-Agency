import image1 from '../../../../shared/assets/places/image1.png';
import image2 from '../../../../shared/assets/places/image2.png';
import image3 from '../../../../shared/assets/places/image3.png';
import { TourType } from '../types/searchbar';

export const getTours = () => {
  const toursList: TourType[] = [
    {
      id: 1,
      name: 'Nha Trang (Vietnam)',
      date: '04 Jan - 10 Jan (2022)',
      img: image1
    },
    {
      id: 2,
      name: 'Paris (France)',
      date: '04 Jan - 10 Jan (2022)',
      img: image2
    },
    {
      id: 3,
      name: 'Bangkok (Thailand)',
      date: '04 Jan - 10 Jan (2022)',
      img: image3
    },
    {
      id: 4,
      name: 'Nha Trang (Vietnam)',
      date: '04 Jan - 10 Jan (2022)',
      img: image1
    },
    {
      id: 5,
      name: 'Paris (France)',
      date: '04 Jan - 10 Jan (2022)',
      img: image2
    },
    {
      id: 6,
      name: 'Bangkok (Thailand)',
      date: '04 Jan - 10 Jan (2022)',
      img: image3
    }
  ];
  return toursList;
};
