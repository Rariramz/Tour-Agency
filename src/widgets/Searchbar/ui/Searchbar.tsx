import { memo, useMemo, useState } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Search } from '../../Search/ui/Search';
import { PreviewCard } from '../../PreviewCard';
import { getTours } from '../model/selectors/getTours';
import cls from './Searchbar.module.scss';

interface SearchbarProps {
  className?: string;
}

const Searchbar = memo(({ className }: SearchbarProps) => {
  const tours = getTours();
  const [searchValue, setSearchValue] = useState('');

  const filterTours = () => {
    const filtered = tours.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
    return filtered;
  };

  const filteredTours = useMemo(() => filterTours(), [searchValue]);

  return (
    <div
      className={classNames(
        cls.Searchbar,
        { },
        [className ?? '']
      )}
    >
      <Search value={searchValue} onChange={setSearchValue} submit={false} className={cls.search} />
      <div className={cls.results}>
        {filteredTours.map((item) => <PreviewCard key={item.id} item={item} className={cls.card} />)}
      </div>
    </div>
  );
});

Searchbar.displayName = 'Searchbar';

export { Searchbar };
