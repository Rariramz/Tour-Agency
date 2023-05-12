import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import LikeIcon from '../../../../shared/assets/heart.svg';
import { IconBg } from '../../../../shared/ui/IconBg/IconBg';
import cls from './AddToWishlistButton.module.scss';

interface AddToWishlistButtonProps {
  className?: string;
  tourId: number;
}

const AddToWishlistButton = memo(({ className, tourId }: AddToWishlistButtonProps) => {
  return (
    <IconBg className={classNames(cls.AddToWishlistButton, {}, [className ?? ''])}>
      <LikeIcon />
    </IconBg>
  );
});

AddToWishlistButton.displayName = 'AddToWishlistButton';

export { AddToWishlistButton };
