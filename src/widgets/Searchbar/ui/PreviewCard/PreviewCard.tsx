import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Image } from '../../../../shared/ui/Image/Image';
import { Heading } from '../../../../shared/ui/Heading/Heading';
import { Paragraph } from '../../../../shared/ui/Paragraph/Paragraph';
import { Rating } from '../../../../shared/ui/Rating/Rating';
import { TourType } from '../../model/types/searchbar';
import { Card } from '../../../../shared/ui/Card/Card';
import { TourRoute } from '../../../../shared/ui/TourRoute/TourRoute';
import { TourDates } from '../../../../shared/ui/TourDates';
import { Col } from '../../../../shared/ui/Col/Col';
import { ColGapSize } from '../../../../shared/ui/Col/Col';
import { Row, RowAlign } from '../../../../shared/ui/Row/Row';
import cls from './PreviewCard.module.scss';

interface PreviewCardProps {
  item: TourType;
  className?: string;
}

const PreviewCard = memo(({ item, className }: PreviewCardProps) => {
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
  } = item;

  return (
    <Card className={classNames(cls.PreviewCard, {}, [className ?? ''])}>
      <Image
        src={image}
        className={cls.previewImage}
      />
      <Col className={cls.previewContent} gapSize={ColGapSize.XL}>
        <Row className={cls.previewHeader} align={RowAlign.BETWEEN}>
          <Heading className={cls.previewTitle}>{hotel}</Heading>
          <Rating rating={rating} shorten={true} />
        </Row>
        <Col gapSize={ColGapSize.L}>
          <TourDates dateDeparture={dateDeparture} dateArrival={dateArrival} />
          <TourRoute cityDeparture={cityDeparture} cityArrival={cityArrival} shorten={true} />
        </Col>
        <Row className={cls.previewFooter} align={RowAlign.BETWEEN}>
          <Paragraph className={cls.previewGuests}>{guests} guests</Paragraph>
          <Heading className={cls.previewPrice}>{currency} {price}</Heading>
        </Row>
      </Col>
    </Card>
  );
});

PreviewCard.displayName = 'PreviewCard';

export { PreviewCard };
