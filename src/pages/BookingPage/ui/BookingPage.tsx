import { classNames } from '../../../shared/lib/classNames/classNames';
import { Col, ColGapSize } from '../../../shared/ui/Col/Col';
import { Heading } from '../../../shared/ui/Heading/Heading';
import { TourCard } from '../../../widgets/TourCard';
import { Wishlist } from '../../../widgets/Wishlist';
import cls from './BookingPage.module.scss';

const BookingPage = () => {
  return (
    <div className={classNames(cls.bookingPage)}>
      <Col className={cls.leftCol} gapSize={ColGapSize.XXL}>
        <Heading>Liked tours</Heading>
        <Wishlist className={cls.bookingWishlist} />
      </Col>
      <Col className={cls.rightCol} gapSize={ColGapSize.XXL}>
        <Heading>Chosen tour</Heading>
        <TourCard className={cls.bookingTourCard}/>
      </Col>
    </div>
  );
};

export default BookingPage;
