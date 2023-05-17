import { memo } from 'react';
import Calendar from 'react-calendar';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Card } from '../../../shared/ui/Card/Card';
import './Calendar.css';
import { CalendarProps } from 'react-calendar/dist/cjs/Calendar';
import cls from './ReactCalendar.module.scss';

interface ReactCalendarProps extends Partial<CalendarProps> {
  className?: string;
}

const ReactCalendar = memo((props: ReactCalendarProps) => {
  const {
    className,
    ...calendarProps
  } = props; 

  return (
    <Card className={classNames(cls.ReactCalendar)}>
      <Calendar {...calendarProps}/>
    </Card>
  );
})

ReactCalendar.displayName = 'ReactCalendar';

export { ReactCalendar };
