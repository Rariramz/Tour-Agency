import { memo, ComponentProps } from 'react';
import Calendar from 'react-calendar';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Card } from '../../../shared/ui/Card/Card';
import './Calendar.css';
import cls from './ReactCalendar.module.scss';

interface ReactCalendarProps extends ComponentProps<typeof Calendar> {
  className?: string;
}

const ReactCalendar = memo((props: ReactCalendarProps) => {
  const { className, ...calendarProps } = props;

  return (
    <Card className={classNames(cls.ReactCalendar, {}, [className ?? ''])}>
      <Calendar
        {...calendarProps}
        locale={'en'}
      />
    </Card>
  );
});

ReactCalendar.displayName = 'ReactCalendar';

export { ReactCalendar };
