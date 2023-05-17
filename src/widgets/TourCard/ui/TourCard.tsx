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
import { Card } from '../../../shared/ui/Card/Card';
import { Row, RowAlign, RowGapSize } from '../../../shared/ui/Row/Row';
import { Col, ColGapSize } from '../../../shared/ui/Col/Col';
import cls from './TourCard.module.scss';
import { AddToWishlistButton } from '../../../features/wishlist/AddToWishlist/ui/AddToWishlistButton';
import { Counter } from '../../../shared/ui/Counter/Counter';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
    datesDeparture,
    nightsAmounts,
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
    <Card className={classNames(cls.TourCard, { }, [className ?? ''])}>
      <Col>
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
          <TourDates dateDeparture={datesDeparture[0]} dateArrival={moment(datesDeparture[0]).add('days', nightsAmounts[0]).format('YYYY-MM-DD')} />
          <Paragraph>{description}</Paragraph>          
          <Row gapSize={RowGapSize.XL}>
            <Heading>{currency} {tourPrice}</Heading>
            <Counter count={guestsAmount} setCount={setGuestsAmount} unit={'guest(s)'} min={1} />
          </Row>
          <Link className={cls.Link} to={`${id}`}><Button fullwidth={true}>Read more</Button></Link>
        </Col>
      </Col>
    </Card>
  );
});

TourCard.displayName = 'TourCard';

export { TourCard };
