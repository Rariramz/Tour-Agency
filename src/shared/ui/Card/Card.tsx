import { memo, ReactNode } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardLandscape {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

interface CardProps {
  className?: string;
  children?: ReactNode;
  landscape?: CardLandscape;
}

const Card = memo((props: CardProps) => {
  const {
    children,
    className,
    landscape = CardLandscape.HORIZONTAL,
  } = props;
  return (
    <div className={classNames(cls.Card, {}, [className ?? '', cls[landscape]])}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export { Card };
