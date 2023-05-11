import { memo, useMemo, useState } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { getTour } from '../model/selectors/getTour';
import { Image } from '../../../shared/ui/Image/Image';
import { Heading } from '../../../shared/ui/Heading/Heading';
import LikeIcon from '../../../shared/assets/like.svg';
import PinIcon from '../../../shared/assets/pin.svg';
import { Paragraph } from '../../../shared/ui/Paragraph/Paragraph';
import { Rating } from '../../../shared/ui/Rating/Rating';
import { TourRoute } from '../../../shared/ui/TourRoute/TourRoute';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';
import { TourDates } from '../../../shared/ui/TourDates';
import cls from './TourCard.module.scss';

interface TourCardProps {
  className?: string;
}

const TourCard = memo(({ className }: TourCardProps) => {
  const tour = getTour();
  const {
    id,
    name,
    cityDeparture,
    cityArrival,
    hotel,
    dateDeparture,
    dateArrival,
    price,
    currency,
    description,
    image,
    guests,
    rating,
  } = tour;

  return (
    <div className={classNames(cls.TourCard, {}, [className ?? ''])}>
      <div className={cls.tourCardImageContainer}>
        <div className={cls.tourCardLikeDiv}>
          <LikeIcon />
        </div>
        <Image src={image} className={cls.tourCardImage} />
        <div className={cls.tourCardRatingDiv}>
          <div className={cls.tourCardHotelDiv}>
            <PinIcon />
            <Heading>{hotel}</Heading>
          </div>
          <Rating rating={rating} />
        </div>
      </div>
      <div className={cls.tourCardContent}>
        <TourRoute cityDeparture={cityDeparture} cityArrival={cityArrival} />
        <TourDates dateDeparture={dateDeparture} dateArrival={dateArrival} />
        <Paragraph>{description}</Paragraph>
        <div className={cls.tourCardPriceDiv}>
          <Heading>{currency} {price}</Heading>
          <Paragraph>({guests} guests)</Paragraph>
        </div>
        <Button theme={ButtonTheme.CONTAIN} fullwidth={true}>BUY</Button>
      </div>
    </div>
  );
});

TourCard.displayName = 'TourCard';

export { TourCard };
