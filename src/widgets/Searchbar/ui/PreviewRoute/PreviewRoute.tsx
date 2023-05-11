import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import PlaneIcon from '../../../../shared/assets/plane.svg';
import { Paragraph } from '../../../../shared/ui/Paragraph/Paragraph';
import cls from './PreviewRoute.module.scss';

interface PreviewRouteProps {
  cityDeparture: string;
  cityArrival: string;
  className?: string;
  shorten?: boolean;
}

const PreviewRoute = memo(({ cityDeparture, cityArrival, className, shorten }: PreviewRouteProps) => {
  return (
    <div className={classNames(cls.PreviewRoute, {}, [className ?? ''])}>
      <PlaneIcon />
      {
        shorten ? (
          <Paragraph className={cls.FromTo}><strong>{cityDeparture}</strong> - <strong>{cityArrival}</strong></Paragraph>
        ) : (
          <Paragraph className={cls.FromTo}>From <strong>{cityDeparture} (Russia)</strong> to <strong>{cityArrival} (Russia)</strong></Paragraph>
        )
      }
    </div>
  );
});

PreviewRoute.displayName = 'PreviewRoute';

export { PreviewRoute };
