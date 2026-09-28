import { Tour } from '../model/types/types';

export function filterTours(tours: Tour[], query: string): Tour[] {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return tours.filter((tour) => {
    const text = [
      tour.cityDeparture,
      tour.cityArrival,
      tour.countryArrival,
      tour.description
    ]
      .join(' ')
      .toLocaleLowerCase();
    return words.every((word) => text.includes(word));
  });
}
