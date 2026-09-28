import { Tour } from '../../../entities/tour/model/types/types';
import { Image } from '../../../shared/ui/Image/Image';
import { Card } from '../../../shared/ui/Card/Card';
import { Col, ColGapSize } from '../../../shared/ui/Col/Col';
import { Heading } from '../../../shared/ui/Heading/Heading';
import { Paragraph } from '../../../shared/ui/Paragraph/Paragraph';
import { TourRoute } from '../../../shared/ui/TourRoute/TourRoute';
import { classNames } from '../../../shared/lib/classNames/classNames';
import cls from './TourCard.module.scss';

interface TourCardProps {
  tour: Tour;
  className?: string;
}

export const TourCard = ({ tour, className }: TourCardProps) => (
  <Card className={classNames(cls.TourCard, {}, [className ?? ''])}>
    <Col gapSize={ColGapSize.XL}>
      <Image
        src={tour.image}
        alt={`Accommodation illustration for ${tour.cityArrival}`}
      />
      <Col
        className={cls.tourCardContent}
        gapSize={ColGapSize.XL}
      >
        <Heading>
          {tour.cityArrival}, {tour.countryArrival}
        </Heading>
        <TourRoute
          cityDeparture={tour.cityDeparture}
          cityArrival={tour.cityArrival}
        />
        <Paragraph>{tour.description}</Paragraph>
        <Heading>
          {new Intl.NumberFormat('en', {
            style: 'currency',
            currency: tour.currency
          }).format(tour.price)}
        </Heading>
        <Paragraph>
          Total for {tour.guests} guest(s), {tour.nightsAmount} nights
        </Paragraph>
        <h2>Departure dates</h2>
        {tour.datesDeparture.length ? (
          <ul>
            {tour.datesDeparture.map((date) => (
              <li key={date}>
                <time dateTime={date}>{date}</time>
              </li>
            ))}
          </ul>
        ) : (
          <p>No departures are currently available.</p>
        )}
      </Col>
    </Col>
  </Card>
);
