import { memo, useState } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import { ReactCalendar } from '../ReactCalendar/ReactCalendar';
import { Input } from '../Input/Input';
import moment from 'moment';
import { Select } from '../Select/Select';
import { Row, RowGapSize } from '../Row/Row';
import { Col, ColGapSize } from '../Col/Col';
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
    console.log('availableDepartureDates', availableDepartureDates)
      console.log('v', moment(v).format('YYYY-MM-DD'))
    if (availableDepartureDates.includes(moment(v).format('YYYY.MM.DD'))) {
      setCurrentDate(moment(v).format('YYYY-MM-DD'))
    };
  }

  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    if (!currentDate && availableDepartureDates.some((d) => moment(d).format('YYYY-MM-DD') === formattedDate)) {
      return cls.highlightedAvailable;
    } else {
      if (formattedDate === currentDate) {
        return cls.highlightedAvailable;
      }

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
    <Col className={classNames(cls.DatePicker)} gapSize={ColGapSize.L}>
      <Row gapSize={RowGapSize.L}>
        <Input className={cls.datePickerInput} placeholder={'Choose departure date..'} value={currentDate} reset={() => setCurrentDate('')} />
        <Select className={cls.datePickerSelect} options={availableNightsAmounts.map(v => ({value: v, content: v}))} value={nights} onChange={(v: number) => setNights(v)} />
      </Row>
      <ReactCalendar onChange={onChange} tileClassName={tileClassName} />
    </Col>
  );
});

DatePicker.displayName = 'DatePicker';

export { DatePicker };
