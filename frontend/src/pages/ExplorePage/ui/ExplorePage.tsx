import { Searchbar } from '../../../widgets/Searchbar';
import { Globe } from '../../../widgets/Globe';
import cls from './ExplorePage.module.scss';

const ExplorePage = () => (
  <div className={cls.explorePage}>
    <Searchbar />
    <div className={cls.globe}>
      <Globe />
    </div>
  </div>
);
export default ExplorePage;
