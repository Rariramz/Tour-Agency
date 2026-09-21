import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from '../../../../features/search/Search/ui/Search';
import { PreviewCard } from '../PreviewCard/PreviewCard';
import { useGetToursQuery } from '../../../../entities/tour/api/toursApi';
import { filterTours } from '../../../../entities/tour/lib/filterTours';
import cls from './Searchbar.module.scss';

export const Searchbar = () => {
  const { data: tours = [], isLoading, isError, refetch } = useGetToursQuery();
  const [searchValue, setSearchValue] = useState('');
  const filteredTours = filterTours(tours, searchValue);
  return (
    <section
      className={cls.Searchbar}
      aria-label='Find a tour'
    >
      <h1>Explore tours</h1>
      <Search
        value={searchValue}
        onChange={setSearchValue}
      />
      {isLoading && <p role='status'>Loading tours…</p>}
      {isError && (
        <div role='alert'>
          <p>We couldn&apos;t load tours.</p>
          <button onClick={() => void refetch()}>Try again</button>
        </div>
      )}
      {!isLoading && !isError && (
        <>
          <p role='status'>{filteredTours.length} tour(s) found</p>
          {!tours.length && (
            <p>No tours are available yet. Please check back soon.</p>
          )}
          {!!tours.length && !filteredTours.length && (
            <p>No tours match your search. Try another destination.</p>
          )}
          <div className={cls.results}>
            {filteredTours.map((tour) => (
              <Link
                key={tour.id}
                to={`/explore/${tour.id}`}
                className={cls.card}
              >
                <PreviewCard item={tour} />
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
