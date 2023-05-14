import { memo, useEffect, useMemo, useState } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { getTour } from '../model/selectors/getTour';
import { Image } from '../../../shared/ui/Image/Image';
import { Heading } from '../../../shared/ui/Heading/Heading';
import PinIcon from '../../../shared/assets/pin.svg';
import { Paragraph } from '../../../shared/ui/Paragraph/Paragraph';
import { Rating } from '../../../shared/ui/Rating/Rating';
import { TourRoute } from '../../../shared/ui/TourRoute/TourRoute';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';
import { TourDates } from '../../../shared/ui/TourDates';
import { Card, CardLandscape } from '../../../shared/ui/Card/Card';
import { Row, RowAlign, RowGapSize } from '../../../shared/ui/Row/Row';
import { Col, ColGapSize } from '../../../shared/ui/Col/Col';
import cls from './TourCard.module.scss';
import { AddToWishlistButton } from '../../../features/wishlist/AddToWishlist/ui/AddToWishlistButton';
import { Counter } from '../../../shared/ui/Counter/Counter';

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
  const [guestsAmount, setGuestsAmount] = useState<number>(guests);
  const [tourPrice, setTourPrice] = useState<number>(price);

  useEffect(() => {
    setTourPrice(price / 2 * guestsAmount);
  }, [guestsAmount]);

  return (
    <div className={classNames(cls.ScrollDiv, {}, [className ?? ''])}>
      <Card className={classNames(cls.TourCard, {}, [className ?? ''])} landscape={CardLandscape.VERTICAL}>
        <Col className={cls.tourCardImageContainer}>
          <div className={cls.tourCardLikeDiv}>
            <AddToWishlistButton tourId={id} />
          </div>
          <Image src={image} />
          <Row className={cls.tourCardRatingDiv} align={RowAlign.BETWEEN}>
            <Row gapSize={RowGapSize.XL}>
              <PinIcon className={cls.PinIcon}/>
              <Heading>{hotel}</Heading>
            </Row>
            <Rating rating={rating} />
          </Row>
        </Col>
        <Col className={cls.tourCardContent} gapSize={ColGapSize.XL}>
          <TourRoute cityDeparture={cityDeparture} cityArrival={cityArrival} />
          <TourDates dateDeparture={dateDeparture} dateArrival={dateArrival} />
          <Paragraph>{description}</Paragraph>          
          <Row gapSize={RowGapSize.XL}>
            <Heading>{currency} {tourPrice}</Heading>
            <Counter count={guestsAmount} setCount={setGuestsAmount} unit={'guest(s)'} min={1} />
          </Row>
          <Button theme={ButtonTheme.CONTAIN} fullwidth={true}>BUY</Button>
        </Col>
      </Card>
    </div>
  );
});

TourCard.displayName = 'TourCard';

export { TourCard };
