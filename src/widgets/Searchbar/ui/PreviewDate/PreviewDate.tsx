import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import CalendarIcon from '../../../../shared/assets/calendar.svg';
import cls from './PreviewDate.module.scss';
import { Paragraph } from '../../../../shared/ui/Paragraph/Paragraph';

interface PreviewDateProps {
  dateDeparture: string;
  dateArrival: string;
  className?: string;
}

const PreviewDate = memo(({ dateDeparture, dateArrival, className }: PreviewDateProps) => {
  return (
    <div className={classNames(cls.PreviewDate, {}, [className ?? ''])}>
      <CalendarIcon />
      <Paragraph className={cls.FromTo} >{dateDeparture} - {dateArrival}</Paragraph>
    </div>
  );
});

PreviewDate.displayName = 'PreviewDate';

export { PreviewDate };
