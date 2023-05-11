import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import CalendarIcon from '../../../../shared/assets/calendar.svg';
import cls from './TourDates.module.scss';
import { Paragraph } from '../../../../shared/ui/Paragraph/Paragraph';

interface TourDatesProps {
  dateDeparture: string;
  dateArrival: string;
  className?: string;
}

const TourDates = memo(({ dateDeparture, dateArrival, className }: TourDatesProps) => {
  return (
    <div className={classNames(cls.TourDates, {}, [className ?? ''])}>
      <CalendarIcon />
      <Paragraph className={cls.FromTo} >{dateDeparture} - {dateArrival}</Paragraph>
    </div>
  );
});

TourDates.displayName = 'TourDates';

export { TourDates };
