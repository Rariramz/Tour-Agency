import { memo, ReactNode } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import cls from './Card.module.scss';

interface CardProps {
  className?: string;
  children?: ReactNode;
}

const Card = memo((props: CardProps) => {
  const {
    children,
    className,
  } = props;
  return (
    <div className={classNames(cls.Card, {}, [className ?? ''])}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export { Card };
