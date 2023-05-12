import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import LikeIcon from '../../../../shared/assets/heart.svg';
import cls from './AddToWishlistButton.module.scss';

interface AddToWishlistButtonProps {
  className?: string;
  tourId: number;
}

const AddToWishlistButton = memo(({ className, tourId }: AddToWishlistButtonProps) => {
  return (
    <div className={classNames(cls.AddToWishlistButton, {}, [className ?? ''])}>
        <LikeIcon />
    </div>
  );
});

AddToWishlistButton.displayName = 'AddToWishlistButton';

export { AddToWishlistButton };
