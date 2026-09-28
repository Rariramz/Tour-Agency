import { memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Image.module.scss';

interface ImageProps {
  className?: string;
  src: string;
  alt?: string;
}

const Image = memo(({ src, className, alt = '' }: ImageProps) => {
  return (
    <div className={classNames(cls.Image, {}, [className ?? ''])}>
      {src && (
        <img
          src={src}
          alt={alt}
          loading='lazy'
        />
      )}
    </div>
  );
});

Image.displayName = 'Image';

export { Image };
