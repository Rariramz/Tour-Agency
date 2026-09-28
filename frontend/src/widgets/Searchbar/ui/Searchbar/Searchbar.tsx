import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from '../../../../features/search/Search/ui/Search';
import { PreviewCard } from '../PreviewCard/PreviewCard';
import { useGetToursQuery } from '../../../../entities/tour/api/toursApi';
import { filterTours } from '../../../../entities/tour/lib/filterTours';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import cls from './Searchbar.module.scss';

interface SearchbarProps {
  selectedTourId?: number;
  onTourSelectionClear: () => void;
}

export const Searchbar = ({
  selectedTourId,
  onTourSelectionClear
}: SearchbarProps) => {
  const { data: tours = [], isLoading, isError, refetch } = useGetToursQuery();
  const [searchValue, setSearchValue] = useState('');
  const cardRefs = useRef<Record<number, HTMLAnchorElement | null>>({});
  const filteredTours = filterTours(tours, searchValue);

  useEffect(() => {
    if (selectedTourId === undefined) return;
    if (searchValue) {
      setSearchValue('');
      return;
    }
    requestAnimationFrame(() =>
      cardRefs.current[selectedTourId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    );
  }, [selectedTourId, searchValue]);

  return (
    <section
      className={cls.Searchbar}
      aria-label='Find a tour'
    >
      <h1>Explore tours</h1>
      <Search
        value={searchValue}
        onChange={(value) => {
          setSearchValue(value);
          onTourSelectionClear();
        }}
      />
      {isLoading && (
        <div
          className={cls.feedback}
          role='status'
        >
          <span className={cls.spinner} />
          <div>
            <strong>Finding available tours</strong>
            <p>This should only take a moment.</p>
          </div>
        </div>
      )}
      {isError && (
        <div
          className={cls.feedback}
          role='alert'
        >
          <span
            className={cls.errorIcon}
            aria-hidden='true'
          >
            !
          </span>
          <div className={cls.feedbackCopy}>
            <strong>Tours are temporarily unavailable</strong>
            <p>Check your connection, then try once more.</p>
          </div>
          <button
            className={cls.retryButton}
            type='button'
            onClick={() => void refetch()}
          >
            Try again
          </button>
        </div>
      )}
      {!isLoading && !isError && (
        <>
          <p
            className={cls.resultCount}
            role='status'
          >
            {filteredTours.length}{' '}
            {filteredTours.length === 1 ? 'tour' : 'tours'} found
          </p>
          {!tours.length && (
            <p className={cls.emptyState}>
              No tours are available yet. Please check back soon.
            </p>
          )}
          {!!tours.length && !filteredTours.length && (
            <p className={cls.emptyState}>
              No tours match your search. Try another destination.
            </p>
          )}
          <div className={cls.results}>
            {filteredTours.map((tour) => (
              <Link
                key={tour.id}
                ref={(element) => {
                  cardRefs.current[tour.id] = element;
                }}
                to={`/explore/${tour.id}`}
                className={classNames(cls.card, {
                  [cls.selected]: tour.id === selectedTourId
                })}
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
