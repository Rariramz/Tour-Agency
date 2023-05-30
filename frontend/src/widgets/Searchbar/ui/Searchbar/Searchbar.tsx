import { memo, useMemo, useState } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Search } from '../../../../features/search/Search/ui/Search';
import { PreviewCard } from '../PreviewCard/PreviewCard';
import { Col, ColGapSize } from '../../../../shared/ui/Col/Col';
import cls from './Searchbar.module.scss';
import { useGetToursQuery } from '../../../../entities/tour/api/toursApi';

interface SearchbarProps {
  className?: string;
}

const Searchbar = memo(({ className }: SearchbarProps) => {
  const { data: tours = [], isLoading } = useGetToursQuery();
  const [searchValue, setSearchValue] = useState('');

  // const filterTours = () => {
  //   const filtered = tours.filter((tour) =>
  //     Object.values(tour).filter(x => isNaN(x)).some((field) =>
  //       field.toLowerCase().includes(searchValue.toLowerCase())
  //     )
  //   );
  //   return filtered;
  // };

  // const filteredTours = useMemo(() => filterTours(), [searchValue]);

  return (
    <div className={classNames(cls.Searchbar, {}, [className ?? ''])}>
      <Col gapSize={ColGapSize.XXL}>
        <Search
          value={searchValue}
          onChange={setSearchValue}
        />
        <div className={cls.relativeDiv}>
          <div className={cls.ScrollDiv}>
            <Col className={cls.results}>
              {/* {tours.map((item) => (
                <PreviewCard
                  key={item.id}
                  item={item}
                  className={classNames(cls.card, {}, [item.id === 1 ? cls.tourChosen : ''])}
                />
              ))} */}
            </Col>
          </div>
        </div>
      </Col>
    </div>
  );
});

Searchbar.displayName = 'Searchbar';

export { Searchbar };
