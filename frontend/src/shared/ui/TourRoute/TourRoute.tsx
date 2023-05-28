import { memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import PlaneIcon from '../../assets/plane.svg';
import { Paragraph } from '../Paragraph/Paragraph';
import { Row, RowGapSize } from '../Row/Row';
import { IconBg } from '../IconBg/IconBg';
import cls from './TourRoute.module.scss';

interface TourRouteProps {
  cityDeparture: string;
  cityArrival: string;
  className?: string;
  shorten?: boolean;
}

const TourRoute = memo(({ cityDeparture, cityArrival, className, shorten }: TourRouteProps) => {
  return (
    <Row className={classNames(cls.TourRoute, {}, [className ?? ''])} gapSize={RowGapSize.L}>
      <IconBg className={classNames(cls.PlaneIcon)}>
        <PlaneIcon />
      </IconBg>
      {
        shorten ? (
          <Paragraph className={cls.FromTo}><strong>{cityDeparture}</strong> - <strong>{cityArrival}</strong></Paragraph>
        ) : (
          <Paragraph className={cls.FromTo}>From <strong>{cityDeparture} (Poland)</strong> to <strong>{cityArrival} (Cyprus)</strong></Paragraph>
        )
      }
    </Row>
  );
});

TourRoute.displayName = 'TourRoute';

export { TourRoute };
