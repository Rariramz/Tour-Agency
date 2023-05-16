import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Image } from '../../../../shared/ui/Image/Image';
import { Heading } from '../../../../shared/ui/Heading/Heading';
import { Paragraph } from '../../../../shared/ui/Paragraph/Paragraph';
import { Button, ButtonTheme } from '../../../../shared/ui/Button/Button';
import { Card } from '../../../../shared/ui/Card/Card';
import { Row, RowAlign } from '../../../../shared/ui/Row/Row';
import { Col, ColGapSize } from '../../../../shared/ui/Col/Col';
import { TourType } from '../../../Searchbar/model/types/searchbar';
import cls from './DoneTourCard.module.scss';

interface DoneTourCardProps {
  className?: string;
  item: TourType;
}

const DoneTourCard = memo(({ item, className }: DoneTourCardProps) => {
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
    <Card className={classNames(cls.DoneTourCard, { }, [className ?? ''])}>
      <Row align={RowAlign.BETWEEN}>
        <Row className={cls.DoneTourRow}>
          <Image className={cls.doneTourImage} src={image} />
          <Col gapSize={ColGapSize.L}>
            <Heading className={cls.doneTourHeading}>{cityArrival}</Heading>
            <Paragraph className={cls.doneTourDates}>{dateDeparture} - {dateArrival}</Paragraph>
          </Col>
        </Row>
        <Button theme={ButtonTheme.CONTAIN}>Rate</Button>
      </Row>
    </Card>
  );
});

DoneTourCard.displayName = 'DoneTourCard';

export { DoneTourCard };
