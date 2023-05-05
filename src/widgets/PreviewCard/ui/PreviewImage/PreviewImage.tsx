import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import cls from './PreviewImage.module.scss';

interface PreviewImageProps {
  className?: string;
  src: string;
}

const PreviewImage = memo(({ src, className }: PreviewImageProps) => {
  return (
    <div
      className={classNames(
        cls.PreviewImage,
        { },
        [className ?? '']
      )}
    >
      <img src={src} />
    </div>
  );
});

PreviewImage.displayName = 'PreviewImage';

export { PreviewImage };
