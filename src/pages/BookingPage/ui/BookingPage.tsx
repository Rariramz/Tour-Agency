import { classNames } from '../../../shared/lib/classNames/classNames';
import cls from './BookingPage.module.scss';
import { ReactCalendar } from '../../../widgets/ReactCalendar/ui/ReactCalendar';

const ExplorePage = () => {
  return (
    <div className={classNames(cls.explorePage)}>
      <ReactCalendar />
    </div>
  );
};

export default ExplorePage;
