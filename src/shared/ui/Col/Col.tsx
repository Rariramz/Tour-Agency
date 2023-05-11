import { ReactNode, memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Col.module.scss';

export enum GapSize {
  M = 'gap_m',
  L = 'gap_l',
  XL = 'gap_xl'
}

export enum ColAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center'
}

interface ColProps {
  className?: string;
  children?: ReactNode;
  align?: ColAlign;
  gapSize?: GapSize;
}

export const Col = memo((props: ColProps) => {
  const {
    className,
    align = ColAlign.LEFT,
    gapSize = GapSize.M,
    children
  } = props;
  return (
    <p className={classNames(cls.Col, {}, [className ?? '', cls[align], cls[gapSize]])}>
      {children}
    </p>
  );
});
