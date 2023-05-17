import { memo, useState } from 'react';
import Calendar from 'react-calendar';
import { classNames } from '../../lib/classNames/classNames';
import { ReactCalendar } from '../ReactCalendar/ReactCalendar';
import { Input } from '../Input/Input';
import moment from 'moment';
import { Select } from '../Select/Select';
import cls from './DatePicker.module.scss';

interface DatePickerProps {
  className?: string;
  availableDepartureDates: string[];
  availableNightsAmounts: number[];
}

const DatePicker = memo((props: DatePickerProps) => {
  const {
    className,
    availableDepartureDates,
    availableNightsAmounts,
  } = props;
  const [currentDate, setCurrentDate] = useState<string>('');
  const [nights, setNights] = useState(availableNightsAmounts[0]);

  const onChange = (v: any) => {
    setCurrentDate(moment(v).format('YYYY-MM-DD'));
  }

  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    if (!currentDate && availableDepartureDates.some((d) => moment(d).format('YYYY-MM-DD') === formattedDate)) {
      return cls.highlightedAvailable;
    } else {
      const startDate = moment(currentDate);
      const endDate = moment(currentDate).add(nights, 'days');
      if (moment(date).isBetween(startDate, endDate)) {
        return cls.highlightedNights;
      }
      if (formattedDate === endDate.format('YYYY-MM-DD')) {
        return cls.highlightedEnd;
      }
    }
  };

  return (
    <div className={classNames(cls.DatePicker)}>
      <Input className={cls.datePickerInput} placeholder={'Choose departure date from available..'} value={currentDate} reset={() => setCurrentDate('')} />
      <Select placeholder={'Select nights amount'} options={availableNightsAmounts.map(v => ({value: v, content: v}))} value={nights} onChange={(v: number) => setNights(v)} />
      <ReactCalendar onChange={onChange} tileClassName={tileClassName} />
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export { DatePicker };
