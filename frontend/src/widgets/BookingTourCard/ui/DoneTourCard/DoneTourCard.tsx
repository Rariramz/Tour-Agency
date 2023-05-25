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
import moment from 'moment';

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
    datesDeparture,
    nightsAmounts,
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
            <Paragraph className={cls.doneTourDates}>{datesDeparture[0]} - {moment(datesDeparture[0]).add(nightsAmounts[0], 'days').format('YYYY-MM-DD')}</Paragraph>
          </Col>
        </Row>
        <Button theme={ButtonTheme.CONTAIN}>Rate</Button>
      </Row>
    </Card>
  );
});

DoneTourCard.displayName = 'DoneTourCard';

export { DoneTourCard };
