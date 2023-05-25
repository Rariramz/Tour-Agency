import { memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Counter.module.scss';
import { Row } from '../Row/Row';
import { IconBg } from '../IconBg/IconBg';

interface CounterProps {
  className?: string;
  unit?: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  min?: number,
  max?: number
}

export const Counter = memo((props: CounterProps) => {
  const {
    className,
    unit,
    min,
    max,
    count,
    setCount,
  } = props;

  const decrease = () => {
    if (min && count > min || !min) setCount(prev => prev - 1);
  };

  const increase = () => {
    if (max && count < max || !max) setCount(prev => prev + 1);
  };

  return (
    <Row className={classNames(cls.Counter, {}, [className ?? ''])}>
      <IconBg className={cls.actionIcon} onClick={decrease}>-</IconBg>
      {count} {unit ?? ''}
      <IconBg className={cls.actionIcon} onClick={increase}>+</IconBg>
    </Row>
  );
});
