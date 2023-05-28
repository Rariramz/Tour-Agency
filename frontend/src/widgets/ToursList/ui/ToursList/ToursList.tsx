import { memo, useMemo, useState } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Col, ColGapSize } from '../../../../shared/ui/Col/Col';
import cls from './ToursList.module.scss';
import { Card } from '../../../../shared/ui/Card/Card';
import { Heading } from '../../../../shared/ui/Heading/Heading';
import { useGetToursQuery } from '../../../../entities/tour/api/toursApi';

interface ToursListProps {
  className?: string;
}

const ToursList = memo(({ className }: ToursListProps) => {
  const { data: tours = [], isLoading } = useGetToursQuery();

  return (
    <div className={classNames(cls.TourToursListsList, {}, [className ?? ''])}>
      <Col gapSize={ColGapSize.XXL}>
        <div className={cls.relativeDiv}>
          <div className={cls.ScrollDiv}>
            <Col className={cls.results}>
              {tours.map((item: any) => (
                <Card>
                  <Heading>{item.id} - {item.name}</Heading>
                </Card>
              ))}
            </Col>
          </div>
        </div>
      </Col>
    </div>
  );
});

ToursList.displayName = 'ToursList';

export { ToursList };
