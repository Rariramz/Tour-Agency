import { useTranslation } from 'react-i18next';

const PlacesPage = () => {
  const { t } = useTranslation('places');

  return (
    <div>
        {t('Страница туров')}
    </div>
  );
};

export default PlacesPage;