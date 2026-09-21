import { Link } from 'react-router-dom';
import { Tour } from '../../../entities/tour/model/types/types';
import { PreviewCard } from '../../Searchbar/ui/PreviewCard/PreviewCard';
import cls from './Wishlist.module.scss';

export const Wishlist = ({
  tours = [],
  className = ''
}: {
  tours?: Tour[];
  className?: string;
}) => (
  <div className={`${cls.Wishlist} ${className}`}>
    {tours.map((tour) => (
      <Link
        key={tour.id}
        to={`/explore/${tour.id}`}
      >
        <PreviewCard item={tour} />
      </Link>
    ))}
  </div>
);
