import { useState } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Col, ColGapSize } from '../../../shared/ui/Col/Col';
import { DatePicker } from '../../../shared/ui/DatePicker/DatePicker';
import { Heading } from '../../../shared/ui/Heading/Heading';
import { getTours } from '../../../widgets/Searchbar/model/selectors/getTours';
import { TourCard } from '../../../widgets/TourCard';
import { Wishlist } from '../../../widgets/Wishlist';
import { Card } from '../../../shared/ui/Card/Card';
import { TourRoute } from '../../../shared/ui/TourRoute/TourRoute';
import { TourDates } from '../../../shared/ui/TourDates';
import { Paragraph } from '../../../shared/ui/Paragraph/Paragraph';
import { Counter } from '../../../shared/ui/Counter/Counter';
import { Row, RowAlign, RowGapSize } from '../../../shared/ui/Row/Row';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';
import { getTour } from '../../../widgets/TourCard/model/selectors/getTour';
import moment from 'moment';
import { AddToWishlistButton } from '../../../features/wishlist/AddToWishlist/ui/AddToWishlistButton';
import PinIcon from '../../../shared/assets/pin.svg';
import { Image } from '../../../shared/ui/Image/Image';
import { Rating } from '../../../shared/ui/Rating/Rating';
import cls from './BookingPage.module.scss';

const BookingPage = () => {
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
  const [date, setDate] = useState(new Date());
  const [guestsAmount, setGuestsAmount] = useState<number>(guests);
  const [tourPrice, setTourPrice] = useState<number>(price);

  return (
    <div className={classNames(cls.bookingPage)}>
      <Col className={cls.bookingPageCol} gapSize={ColGapSize.XXL}>
        <Heading>Book tour</Heading>
        <Card className={cls.BookingTourCard}>
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
            <Col className={cls.tourCardContent} gapSize={ColGapSize.XXL}>
              <TourRoute cityDeparture={cityDeparture} cityArrival={cityArrival} />
              <TourDates dateDeparture={datesDeparture[0]} dateArrival={moment(datesDeparture[0]).add(nightsAmounts[0], 'days').format('YYYY-MM-DD')} />
              <Paragraph>{description}</Paragraph>
              <Row gapSize={RowGapSize.XL} align={RowAlign.BETWEEN}>
                <Heading>{currency} {tourPrice}</Heading>
                <Counter count={guestsAmount} setCount={setGuestsAmount} unit={'guest(s)'} min={1} />
              </Row>
              <Row className={cls.bookingPageDatePickerRow} align={RowAlign.CENTER}>
                <DatePicker availableDepartureDates={datesDeparture} availableNightsAmounts={nightsAmounts} />
              </Row>
              <Row align={RowAlign.CENTER}>
                <Button className={cls.bookingPageButton} theme={ButtonTheme.CONTAIN}>BOOK</Button>
              </Row>
            </Col>
          </Col>
        </Card>
      </Col>
    </div>
  );
};

export default BookingPage;
