import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import Star from '../../../../shared/assets/star.svg';
import cls from './PreviewRating.module.scss';

interface PreviewRatingProps {
  className?: string;
  rating: number;
}

const PreviewRating = memo(({ rating, className }: PreviewRatingProps) => {
  return (
    <div
      className={classNames(
        cls.PreviewRating,
        { },
        [className ?? '']
      )}
    >
      <span>(</span><Star /><span>{rating}</span><span>)</span>
    </div>
  );
});

PreviewRating.displayName = 'PreviewRating';

export { PreviewRating };
