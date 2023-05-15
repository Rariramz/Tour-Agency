import { RefObject, memo, useState } from 'react';
import { getWishlist } from '../model/selectors/getWishlist';
import { Col, ColGapSize } from '../../../shared/ui/Col/Col';
import { PreviewCard } from '../../Searchbar/ui/PreviewCard/PreviewCard';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { TourType } from '../../Searchbar/model/types/searchbar';
import cls from './Wishlist.module.scss';

interface WishlistProps {
  className?: string;
}

const Wishlist = memo(({ className }: WishlistProps) => {
  const wishlist = getWishlist();
  const [chosenTour, setChosenTour] = useState<TourType | null>(null);

  return (
    <Col className={classNames(cls.Wishlist, {}, [className ?? ''])} gapSize={ColGapSize.XL}>
        {wishlist.map((item) => (
            <PreviewCard
                key={item.id}
                item={item}
                className={cls.card}
            />
        ))}
    </Col>
  );
});

Wishlist.displayName = 'Wishlist';

export { Wishlist };
