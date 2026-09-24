import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Tour } from '../../../entities/tour/model/types/types';
import { useCreateReservationMutation } from '../../../entities/reservation/api/reservationsApi';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';
import cls from './BookTourForm.module.scss';

const getErrorMessage = (error: unknown) => {
  if (error && typeof error === 'object' && 'data' in error) {
    const data = error.data;
    if (data && typeof data === 'object' && 'message' in data) {
      const message = data.message;
      return Array.isArray(message) ? message.join(', ') : String(message);
    }
  }
  return 'Unable to create the reservation. Please try again.';
};

export const BookTourForm = ({ tour }: { tour: Tour }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const futureDates = useMemo(
    () =>
      tour.datesDeparture.filter(
        (date) => date >= new Date().toISOString().slice(0, 10)
      ),
    [tour.datesDeparture]
  );
  const [departureDate, setDepartureDate] = useState(futureDates[0] ?? '');
  const [guests, setGuests] = useState(tour.guests || 1);
  const [createReservation, result] = useCreateReservationMutation();
  const total = Math.ceil((tour.price * guests) / tour.guests);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!departureDate) return;
    await createReservation({ tourId: tour.id, departureDate, guests });
  };

  return (
    <form
      className={cls.form}
      onSubmit={(event) => void submit(event)}
    >
      <h2>Reserve this tour</h2>
      <div className={cls.fields}>
        <label className={cls.field}>
          Departure
          <select
            value={departureDate}
            onChange={(event) => setDepartureDate(event.target.value)}
            disabled={!futureDates.length || result.isLoading}
          >
            {futureDates.map((date) => (
              <option
                key={date}
                value={date}
              >
                {date}
              </option>
            ))}
          </select>
        </label>
        <label className={cls.field}>
          Guests
          <input
            type='number'
            min={1}
            max={10}
            value={guests}
            onChange={(event) => setGuests(Number(event.target.value))}
            disabled={result.isLoading}
          />
        </label>
      </div>
      <p>
        Total:{' '}
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: tour.currency
        }).format(total)}{' '}
        for {guests} guest(s), {tour.nightsAmount} nights
      </p>
      {!token ? (
        <p>
          <Link to='/authorization'>Sign in to reserve this tour</Link>
        </p>
      ) : (
        <Button
          type='submit'
          theme={ButtonTheme.CONTAIN}
          disabled={
            !departureDate ||
            guests < 1 ||
            guests > 10 ||
            result.isLoading ||
            result.isSuccess
          }
        >
          {result.isLoading
            ? 'Reserving…'
            : result.isSuccess
            ? 'Reserved'
            : 'Reserve tour'}
        </Button>
      )}
      {!futureDates.length && <p>No future departures are available.</p>}
      {result.isError && (
        <p
          className={cls.error}
          role='alert'
        >
          {getErrorMessage(result.error)}
        </p>
      )}
      {result.isSuccess && (
        <p role='status'>
          Reservation created. <Link to='/booking'>View your bookings</Link>
        </p>
      )}
    </form>
  );
};
