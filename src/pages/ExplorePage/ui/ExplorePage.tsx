import { useTranslation } from 'react-i18next';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Searchbar } from '../../../widgets/Searchbar';
import { Globe } from '../../../widgets/Globe';
import { TourCard } from '../../../widgets/TourCard';
import cls from './ExplorePage.module.scss';

const ExplorePage = () => {
  const { t } = useTranslation('places');

  return (
    <div className={classNames(cls.explorePage)}>
      <Searchbar />
      {/* <div className={cls.mapDiv}>
        {t('Страница туров')}
      </div> */}
      <TourCard />
      <Globe />
    </div>
  );
};

export default ExplorePage;
