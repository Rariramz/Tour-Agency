import { memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Image.module.scss';

interface ImageProps {
  className?: string;
  src: string;
}

const Image = memo(({ src, className }: ImageProps) => {
  return (
    <div
      className={classNames(
        cls.Image,
        { },
        [className ?? '']
      )}
    >
      <img src={src} />
    </div>
  );
});

Image.displayName = 'Image';

export { Image };
