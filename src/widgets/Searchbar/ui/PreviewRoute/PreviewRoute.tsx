import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import PlaneIcon from '../../../../shared/assets/plane.svg';
import { Paragraph } from '../../../../shared/ui/Paragraph/Paragraph';
import cls from './PreviewRoute.module.scss';

interface PreviewRouteProps {
  cityDeparture: string;
  cityArrival: string;
  className?: string;
}

const PreviewRoute = memo(({ cityDeparture, cityArrival, className }: PreviewRouteProps) => {
  return (
    <div className={classNames(cls.PreviewRoute, {}, [className ?? ''])}>
      <PlaneIcon />
      <Paragraph className={cls.FromTo} ><strong>{cityDeparture}</strong> - <strong>{cityArrival}</strong></Paragraph>
    </div>
  );
});

PreviewRoute.displayName = 'PreviewRoute';

export { PreviewRoute };
