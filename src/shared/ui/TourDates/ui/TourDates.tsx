import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import CalendarIcon from '../../../../shared/assets/calendar.svg';
import cls from './TourDates.module.scss';
import { Paragraph } from '../../../../shared/ui/Paragraph/Paragraph';
import { Row, RowGapSize } from '../../Row/Row';

interface TourDatesProps {
  dateDeparture: string;
  dateArrival: string;
  className?: string;
}

const TourDates = memo(({ dateDeparture, dateArrival, className }: TourDatesProps) => {
  return (
    <Row className={classNames(cls.TourDates, {}, [className ?? ''])} gapSize={RowGapSize.L} >
      <CalendarIcon />
      <Paragraph className={cls.FromTo} >{dateDeparture} - {dateArrival}</Paragraph>
    </Row>
  );
});

TourDates.displayName = 'TourDates';

export { TourDates };
