import { filterTours } from './filterTours';
import { Tour } from '../model/types/types';

const tour: Tour = {
  id: 1,
  cityDepartureId: '1',
  cityArrivalId: '2',
  countryDepartureId: '3',
  countryArrivalId: '4',
  hotelId: 'example',
  datesDeparture: ['2027-06-12'],
  nightsAmount: 5,
  price: 780,
  currency: 'EUR',
  guests: 2,
  description: 'Historic streets and local food',
  rating: 4,
  image: '',
  cityDeparture: 'Warsaw',
  cityArrival: 'Lisbon',
  countryArrival: 'Portugal',
  destination: null
};

describe('tour search', () => {
  it('matches case-insensitive words across destination and departure fields', () => {
    expect(filterTours([tour], '  LISBON   warsaw ')).toEqual([tour]);
    expect(filterTours([tour], 'portugal food')).toEqual([tour]);
  });
  it('requires every search word and handles no matches', () => {
    expect(filterTours([tour], 'lisbon rome')).toEqual([]);
    expect(filterTours([], 'lisbon')).toEqual([]);
  });
  it('shows all tours for blank searches without changing the source array', () => {
    const tours = [tour];
    expect(filterTours(tours, '   ')).toEqual(tours);
    filterTours(tours, 'missing');
    expect(tours).toEqual([tour]);
  });
});
