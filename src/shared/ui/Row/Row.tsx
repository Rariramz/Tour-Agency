import { ReactNode, memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Row.module.scss';

export enum RowGapSize {
  M = 'gap_m',
  L = 'gap_l',
  XL = 'gap_xl',
  XXL = 'gap_xxl'
}

export enum RowAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
  BETWEEN = 'between',
}

interface RowProps {
  className?: string;
  children?: ReactNode;
  align?: RowAlign;
  gapSize?: RowGapSize;
}

export const Row = memo((props: RowProps) => {
  const {
    className,
    align = RowAlign.LEFT,
    gapSize = RowGapSize.M,
    children
  } = props;
  return (
    <div className={classNames(cls.Row, {}, [className ?? '', cls[align], cls[gapSize]])}>
      {children}
    </div>
  );
});
