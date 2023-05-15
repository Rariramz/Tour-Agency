import { useState } from 'react';
import Calendar from 'react-calendar';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Card } from '../../../shared/ui/Card/Card';
import './Calendar.css';
import cls from './ReactCalendar.module.scss';

const ReactCalendar = () => {
    const [value, onChange] = useState(new Date());
  
    return (
      <Card className={classNames(cls.ReactCalendar)}>
        <Calendar
          value={value}
        />
      </Card>
    );
}

export { ReactCalendar };