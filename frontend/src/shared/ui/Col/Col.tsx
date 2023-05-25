import { ReactNode, memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Col.module.scss';

export enum ColGapSize {
  M = 'gap_m',
  L = 'gap_l',
  XL = 'gap_xl',
  XXL = 'gap_xxl'
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
  gapSize?: ColGapSize;
}

export const Col = memo((props: ColProps) => {
  const {
    className,
    align = ColAlign.LEFT,
    gapSize = ColGapSize.M,
    children
  } = props;
  return (
    <div className={classNames(cls.Col, {}, [className ?? '', cls[align], cls[gapSize]])}>
      {children}
    </div>
  );
});
