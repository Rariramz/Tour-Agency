import { memo } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import Star from '../../../shared/assets/star.svg';
import cls from './Rating.module.scss';

interface RatingProps {
  className?: string;
  rating: number;
  shorten?: boolean;
}

const Rating = memo(({ rating, className, shorten }: RatingProps) => {
  return (
    <div className={classNames(cls.Rating, {}, [className ?? ''])}>
      {shorten && <span>(</span>}
      <Star width={shorten ? 14 : 16} height={shorten ? 14 : 16} />
      <span>{rating}</span>
      {shorten && <span>)</span>}
    </div>
  );
});

Rating.displayName = 'Rating';

export { Rating };
