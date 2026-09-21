import { Tour } from '../../../../entities/tour/model/types/types';
import { Card } from '../../../../shared/ui/Card/Card';
import { Image } from '../../../../shared/ui/Image/Image';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import cls from './PreviewCard.module.scss';

export const PreviewCard = ({
  item,
  className
}: {
  item: Tour;
  className?: string;
}) => (
  <Card className={classNames(cls.PreviewCard, {}, [className ?? ''])}>
    <Image
      src={item.image}
      className={cls.previewImage}
      alt=''
    />
    <div className={cls.previewContent}>
      <h2>
        {item.cityArrival}, {item.countryArrival}
      </h2>
      <p>
        From {item.cityDeparture} · {item.nightsAmount} nights
      </p>
      <p>{item.datesDeparture[0] ?? 'No departures available'}</p>
      <p>
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: item.currency
        }).format(item.price)}{' '}
        · {item.guests} guest(s)
      </p>
    </div>
  </Card>
);
