import { getNextDeparture } from './getNextDeparture';

describe('getNextDeparture', () => {
  it('chooses the earliest available future date from unsorted dates', () => {
    expect(
      getNextDeparture(
        ['2027-08-12', '2025-07-01', '2027-04-15', '2027-06-01'],
        '2027-03-01'
      )
    ).toBe('2027-04-15');
  });

  it('returns nothing when every departure has passed', () => {
    expect(getNextDeparture(['2025-07-01'], '2027-03-01')).toBeUndefined();
  });
});
