import { Link, useParams } from 'react-router-dom';
import { useGetTourByIdQuery } from '../../../entities/tour/api/toursApi';
import { TourCard } from '../../../widgets/TourCard';
import { BookTourForm } from '../../../features/bookTour/ui/BookTourForm';
import cls from './TourPage.module.scss';

const TourPage = () => {
  const { tourId = '' } = useParams();
  const { data: tour, isLoading, error, refetch } = useGetTourByIdQuery(tourId);
  const missing =
    error &&
    'status' in error &&
    (error.status === 404 || error.status === 400);
  return (
    <main className={cls.tourPage}>
      <Link to='/explore'>← Back to tours</Link>
      {isLoading && <p role='status'>Loading tour…</p>}
      {error && (
        <div role='alert'>
          <h1>{missing ? 'Tour not found' : 'Unable to load this tour'}</h1>
          {!missing && (
            <button onClick={() => void refetch()}>Try again</button>
          )}
        </div>
      )}
      {!error && tour && (
        <>
          <TourCard tour={tour} />
          <BookTourForm tour={tour} />
        </>
      )}
    </main>
  );
};
export default TourPage;
