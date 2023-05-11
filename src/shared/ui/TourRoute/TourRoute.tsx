import { memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import PlaneIcon from '../../assets/plane.svg';
import { Paragraph } from '../Paragraph/Paragraph';
import cls from './TourRoute.module.scss';

interface TourRouteProps {
  cityDeparture: string;
  cityArrival: string;
  className?: string;
  shorten?: boolean;
}

const TourRoute = memo(({ cityDeparture, cityArrival, className, shorten }: TourRouteProps) => {
  return (
    <div className={classNames(cls.TourRoute, {}, [className ?? ''])}>
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

TourRoute.displayName = 'TourRoute';

export { TourRoute };
