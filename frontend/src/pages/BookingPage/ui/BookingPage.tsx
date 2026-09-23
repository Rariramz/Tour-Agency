import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {
  useCancelReservationMutation,
  useGetReservationsQuery
} from '../../../entities/reservation/api/reservationsApi';
import { Button } from '../../../shared/ui/Button/Button';
import { Card } from '../../../shared/ui/Card/Card';
import cls from './BookingPage.module.scss';

const BookingPage = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const {
    data: reservations = [],
    isLoading,
    isError,
    refetch
  } = useGetReservationsQuery(undefined, { skip: !token });
  const [cancelReservation, cancelResult] = useCancelReservationMutation();

  if (!token) {
    return (
      <main className={cls.page}>
        <h1>Your bookings</h1>
        <p>
          <Link to='/authorization'>Sign in</Link> to view your reservations.
        </p>
      </main>
    );
  }

  return (
    <main className={cls.page}>
      <div className={cls.heading}>
        <div>
          <h1>Your bookings</h1>
          <p>Review upcoming trips or cancel a reservation.</p>
        </div>
        <Link to='/explore'>Explore tours</Link>
      </div>

      {isLoading && <p role='status'>Loading bookings…</p>}
      {isError && (
        <div role='alert'>
          <p>Unable to load your bookings.</p>
          <Button onClick={() => void refetch()}>Try again</Button>
        </div>
      )}
      {!isLoading && !isError && !reservations.length && (
        <Card className={cls.empty}>
          <h2>No bookings yet</h2>
          <p>Your reservations will appear here after you choose a tour.</p>
          <Link to='/explore'>Find a tour</Link>
        </Card>
      )}
      <div className={cls.list}>
        {reservations.map((reservation) => (
          <Card
            className={cls.reservation}
            key={reservation.id}
          >
            <div>
              <p className={cls.status}>{reservation.status}</p>
              <h2>
                {reservation.tour.cityArrival},{' '}
                {reservation.tour.countryArrival}
              </h2>
              <p>
                {reservation.tour.cityDeparture} →{' '}
                {reservation.tour.cityArrival}
              </p>
            </div>
            <dl className={cls.details}>
              <div>
                <dt>Departure</dt>
                <dd>{reservation.departureDate}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{reservation.nightsAmount} nights</dd>
              </div>
              <div>
                <dt>Guests</dt>
                <dd>{reservation.guests}</dd>
              </div>
              <div>
                <dt>Total</dt>
                <dd>
                  {new Intl.NumberFormat('en', {
                    style: 'currency',
                    currency: reservation.currency
                  }).format(reservation.price)}
                </dd>
              </div>
            </dl>
            <div className={cls.actions}>
              <Link to={`/explore/${reservation.tourId}`}>View tour</Link>
              <Button
                disabled={cancelResult.isLoading}
                onClick={() => void cancelReservation(reservation.id)}
              >
                Cancel booking
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {cancelResult.isError && (
        <p
          className={cls.error}
          role='alert'
        >
          Unable to cancel the booking. Please try again.
        </p>
      )}
    </main>
  );
};

export default BookingPage;
