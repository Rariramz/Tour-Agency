import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { PreviewImage } from '../PreviewImage/PreviewImage';
import { Heading } from '../../../../shared/ui/Heading/Heading';
import { Paragraph } from '../../../../shared/ui/Paragraph/Paragraph';
import { PreviewRating } from '../PreviewRating/PreviewRating';
import cls from './PreviewCard.module.scss';
import { TourType } from '../../../Searchbar/model/types/searchbar';

interface PreviewCardProps {
  item: TourType;
  className?: string;
}

const PreviewCard = memo(({ item, className }: PreviewCardProps) => {
  const { name, date, img } = item;

  return (
    <div
      className={classNames(
        cls.PreviewCard,
        { },
        [className ?? '']
      )}
    >
      <PreviewImage src={img} />
      <div className={cls.previewContent}>
        <div className={cls.previewHeader}>
          <Heading className={cls.previewTitle}>
            {name}
          </Heading>
          <PreviewRating rating={5} />
        </div>
        <Paragraph>
          {date}
        </Paragraph>
      </div>
    </div>
  );
});

PreviewCard.displayName = 'PreviewCard';

export { PreviewCard };
