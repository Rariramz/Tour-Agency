import { useState } from 'react';
import { Searchbar } from '../../../widgets/Searchbar';
import { Globe } from '../../../widgets/Globe';
import cls from './ExplorePage.module.scss';

const ExplorePage = () => {
  const [selectedTourId, setSelectedTourId] = useState<number>();

  return (
    <div className={cls.explorePage}>
      <Searchbar
        selectedTourId={selectedTourId}
        onTourSelectionClear={() => setSelectedTourId(undefined)}
      />
      <div className={cls.globe}>
        <Globe onTourSelect={setSelectedTourId} />
      </div>
    </div>
  );
};
export default ExplorePage;
