import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Col, ColGapSize } from '../../../../shared/ui/Col/Col';
import cls from './ToursList.module.scss';
import { Card } from '../../../../shared/ui/Card/Card';
import { Heading } from '../../../../shared/ui/Heading/Heading';
import { useGetToursQuery } from '../../../../entities/tour/api/toursApi';
import { Link } from 'react-router-dom';

interface ToursListProps {
  className?: string;
}

const ToursList = memo(({ className }: ToursListProps) => {
  const { data: tours = [], isLoading, isError, refetch } = useGetToursQuery();

  return (
    <section className={classNames(cls.toursList, {}, [className ?? ''])}>
      <div className={cls.heading}>
        <div>
          <Heading>Published tours</Heading>
          {!isLoading && !isError && <p>{tours.length} in the catalogue</p>}
        </div>
      </div>
      {isLoading && <p role='status'>Loading tours…</p>}
      {isError && (
        <div
          className={cls.feedback}
          role='alert'
        >
          <p>Could not load the catalogue.</p>
          <button
            type='button'
            onClick={() => void refetch()}
          >
            Try again
          </button>
        </div>
      )}
      {!isLoading && !isError && !tours.length && (
        <p className={cls.empty}>No tours have been published yet.</p>
      )}
      {!isError && tours.length > 0 && (
        <Col
          className={cls.results}
          gapSize={ColGapSize.XL}
        >
          {tours.map((item) => (
            <Link
              className={cls.tourLink}
              key={item.id}
              to={`/explore/${item.id}`}
            >
              <Card className={cls.card}>
                <div>
                  <Heading>{item.cityArrival}</Heading>
                  <p>From {item.cityDeparture}</p>
                </div>
                <span aria-hidden='true'>→</span>
              </Card>
            </Link>
          ))}
        </Col>
      )}
    </section>
  );
});

ToursList.displayName = 'ToursList';

export { ToursList };
