import { useTranslation } from 'react-i18next';
import { classNames } from '../../../shared/lib/classNames/classNames';
import cls from './Explore.module.scss';
import { Searchbar } from '../../../widgets/Searchbar';
import { Globe } from '../../../widgets/Globe';

const ExplorePage = () => {
  const { t } = useTranslation('places');

  return (
    <div className={classNames(cls.explorePage)}>
      <Searchbar />
      {/* <div className={cls.mapDiv}>
        {t('Страница туров')}
      </div> */}
      <Globe />
    </div>
  );
};

export default ExplorePage;
