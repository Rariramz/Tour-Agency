import { useState } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import cls from './TourPage.module.scss';
import { DatePicker } from '../../../shared/ui/DatePicker/DatePicker';
import { useParams } from 'react-router-dom';
import { getTour } from '../../../widgets/TourCard/model/selectors/getTour';

const TourPage = () => {
  const [date, setDate] = useState(new Date());
  const { tourId } = useParams();
  const tour = getTour();
  const {
    id,
    name,
    cityDeparture,
    cityArrival,
    hotel,
    datesDeparture,
    nightsAmounts,
    price,
    currency,
    description,
    image,
    guests,
    rating,
  } = tour;

  return (
    <div className={classNames(cls.TourPage)}>
      {/* <TourCard className={cls.exploreTourCard}/> */}
      <DatePicker availableDepartureDates={datesDeparture} availableNightsAmounts={nightsAmounts} />
    </div>
  );
};

export default TourPage;
