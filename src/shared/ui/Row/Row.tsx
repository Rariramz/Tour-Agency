import { ReactNode, memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Row.module.scss';

export enum GapSize {
  M = 'gap_m',
  L = 'gap_l',
  XL = 'gap_xl'
}

export enum RowAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center'
}

interface RowProps {
  className?: string;
  children?: ReactNode;
  align?: RowAlign;
  gapSize?: GapSize;
}

export const Row = memo((props: RowProps) => {
  const {
    className,
    align = RowAlign.LEFT,
    gapSize = GapSize.M,
    children
  } = props;
  return (
    <p className={classNames(cls.Row, {}, [className ?? '', cls[align], cls[gapSize]])}>
      {children}
    </p>
  );
});
