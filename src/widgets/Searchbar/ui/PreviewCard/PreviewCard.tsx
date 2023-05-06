import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Image } from '../../../../shared/ui/Image/Image';
import { Heading } from '../../../../shared/ui/Heading/Heading';
import { Paragraph } from '../../../../shared/ui/Paragraph/Paragraph';
import { Rating } from '../../../../shared/ui/Rating/Rating';
import { TourType } from '../../model/types/searchbar';
import { Card } from '../../../../shared/ui/Card/Card';
import cls from './PreviewCard.module.scss';

interface PreviewCardProps {
  item: TourType;
  className?: string;
}

const PreviewCard = memo(({ item, className }: PreviewCardProps) => {
  const { name, date, img } = item;

  return (
    <Card className={classNames(cls.PreviewCard, {}, [className ?? ''])}>
      <Image
        src={img}
        className={cls.previewImage}
      />
      <div className={cls.previewContent}>
        <div className={cls.previewHeader}>
          <Heading className={cls.previewTitle}>{name}</Heading>
          <Rating rating={5} />
        </div>
        <Paragraph>{date}</Paragraph>
      </div>
    </Card>
  );
});

PreviewCard.displayName = 'PreviewCard';

export { PreviewCard };
