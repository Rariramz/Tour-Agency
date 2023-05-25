import { memo, useState } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import LikeIcon from '../../../../shared/assets/heart.svg';
import { IconBg } from '../../../../shared/ui/IconBg/IconBg';
import cls from './AddToWishlistButton.module.scss';

interface AddToWishlistButtonProps {
  className?: string;
  tourId: number;
}

enum IconState {
  ON = 'on',
  OFF = 'off',
}

const AddToWishlistButton = memo(({ className, tourId }: AddToWishlistButtonProps) => {
  const [on, setOn] = useState<IconState>(IconState.OFF);
  //const on = wishlist.includes(tourId);

  const changeColor = () => {
    setOn(IconState.ON);
  };

  return (
    <IconBg className={classNames(cls.AddToWishlistButton, {}, [className ?? '', cls[on]])}>
      <LikeIcon onClick={changeColor}/>
    </IconBg>
  );
});

AddToWishlistButton.displayName = 'AddToWishlistButton';

export { AddToWishlistButton };
