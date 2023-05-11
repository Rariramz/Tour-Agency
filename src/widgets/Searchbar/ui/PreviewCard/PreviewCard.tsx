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
      <div className={cls.previewContent}>
        <div className={cls.previewHeader}>
          <Heading className={cls.previewTitle}>{hotel}</Heading>
          <Rating rating={rating} shorten={true} />
        </div>
        <TourDates dateDeparture={dateDeparture} dateArrival={dateArrival} />
        <TourRoute cityDeparture={cityDeparture} cityArrival={cityArrival} shorten={true} />
        <div className={cls.previewFooter}>
          <Paragraph className={cls.previewGuests}>{guests} guests</Paragraph>
          <Heading className={cls.previewPrice}>{currency} {price}</Heading>
        </div>
      </div>
    </Card>
  );
});

PreviewCard.displayName = 'PreviewCard';

export { PreviewCard };
