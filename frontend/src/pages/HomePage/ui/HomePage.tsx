import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useGetToursQuery } from '../../../entities/tour/api/toursApi';
import { getNextDeparture } from '../../../entities/tour/lib/getNextDeparture';
import { useGetReservationsQuery } from '../../../entities/reservation/api/reservationsApi';
import { PreviewCard } from '../../../widgets/Searchbar/ui/PreviewCard/PreviewCard';
import cls from './HomePage.module.scss';

const HomePage = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const isClient = Boolean(token && user?.role === 'CLIENT');
  const {
    data: tours = [],
    isLoading: toursLoading,
    isError: toursError,
    refetch: refetchTours
  } = useGetToursQuery();
  const {
    data: reservations = [],
    isLoading: reservationsLoading,
    isError: reservationsError,
    refetch: refetchReservations
  } = useGetReservationsQuery(undefined, { skip: !isClient });
  const today = new Date().toISOString().slice(0, 10);
  const featuredTours = tours
    .filter((tour) => getNextDeparture(tour.datesDeparture, today))
    .sort((first, second) =>
      (getNextDeparture(first.datesDeparture, today) ?? '').localeCompare(
        getNextDeparture(second.datesDeparture, today) ?? ''
      )
    )
    .slice(0, 3);
  const nextReservation = reservations
    .filter((reservation) => reservation.departureDate >= today)
    .sort((first, second) =>
      first.departureDate.localeCompare(second.departureDate)
    )[0];

  return (
    <main className={cls.page}>
      <section className={cls.hero}>
        <div className={cls.heroCopy}>
          <p className={cls.eyebrow}>Tour Agency</p>
          <h1>
            {user ? 'Your next journey starts here' : 'Find your next trip'}
          </h1>
          <p>
            Discover available tours, choose your departure, and keep every
            reservation in one place.
          </p>
        </div>
        <div className={cls.heroActions}>
          <Link
            className={cls.primaryAction}
            to='/explore'
          >
            Explore tours
          </Link>
          {user?.role === 'ADMIN' ? (
            <Link
              className={cls.secondaryAction}
              to='/admin'
            >
              Manage tours
            </Link>
          ) : isClient ? (
            <Link
              className={cls.secondaryAction}
              to='/booking'
            >
              Your bookings
            </Link>
          ) : !token ? (
            <Link
              className={cls.secondaryAction}
              to='/authorization'
            >
              Sign in
            </Link>
          ) : null}
        </div>
      </section>

      {isClient && (
        <section
          className={cls.section}
          aria-labelledby='next-trip-heading'
        >
          <div className={cls.sectionHeading}>
            <h2 id='next-trip-heading'>Next trip</h2>
            <Link to='/booking'>All bookings</Link>
          </div>
          {reservationsLoading && (
            <p
              className={cls.loadingState}
              role='status'
            >
              Loading your trips…
            </p>
          )}
          {reservationsError && (
            <div
              className={cls.errorState}
              role='alert'
            >
              <p>We couldn&apos;t load your bookings.</p>
              <button
                type='button'
                onClick={() => void refetchReservations()}
              >
                Try again
              </button>
            </div>
          )}
          {!reservationsLoading &&
            !reservationsError &&
            (nextReservation ? (
              <div className={cls.trip}>
                <div>
                  <p className={cls.eyebrow}>Upcoming reservation</p>
                  <h3>
                    {nextReservation.tour.cityArrival},{' '}
                    {nextReservation.tour.countryArrival}
                  </h3>
                  <p>From {nextReservation.tour.cityDeparture}</p>
                </div>
                <div className={cls.tripDetails}>
                  <p>
                    <strong>{nextReservation.departureDate}</strong> departure
                  </p>
                  <p>
                    {nextReservation.guests} guest(s) ·{' '}
                    {nextReservation.nightsAmount} nights
                  </p>
                  <Link to='/booking'>View booking</Link>
                </div>
              </div>
            ) : (
              <div className={cls.empty}>
                <p>You have no upcoming trips yet.</p>
                <Link to='/explore'>Find a tour</Link>
              </div>
            ))}
        </section>
      )}

      <section
        className={cls.section}
        aria-labelledby='featured-heading'
      >
        <div className={cls.sectionHeading}>
          <div className={cls.sectionTitle}>
            <h2 id='featured-heading'>Available tours</h2>
            <p>Start with the next places you can visit.</p>
          </div>
          <Link to='/explore'>See all tours</Link>
        </div>
        {toursLoading && (
          <p
            className={cls.loadingState}
            role='status'
          >
            Loading tours…
          </p>
        )}
        {toursError && (
          <div
            className={cls.errorState}
            role='alert'
          >
            <p>We couldn&apos;t load tours.</p>
            <button
              type='button'
              onClick={() => void refetchTours()}
            >
              Try again
            </button>
          </div>
        )}
        {!toursLoading && !toursError && !featuredTours.length && (
          <p className={cls.empty}>
            No upcoming departures are available right now.
          </p>
        )}
        <div className={cls.tours}>
          {featuredTours.map((tour) => (
            <Link
              className={cls.tourLink}
              key={tour.id}
              to={`/explore/${tour.id}`}
            >
              <PreviewCard item={tour} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
