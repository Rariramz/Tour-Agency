import { memo } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import Star from '../../../shared/assets/star.svg';
import cls from './Rating.module.scss';

interface RatingProps {
  className?: string;
  rating: number;
}

const Rating = memo(({ rating, className }: RatingProps) => {
  return (
    <div
      className={classNames(
        cls.Rating,
        { },
        [className ?? '']
      )}
    >
      <span>(</span><Star /><span>{rating}</span><span>)</span>
    </div>
  );
});

Rating.displayName = 'Rating';

export { Rating };
