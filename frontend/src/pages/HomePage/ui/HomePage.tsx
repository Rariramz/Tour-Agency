import { useTranslation } from 'react-i18next';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Col, ColGapSize } from '../../../shared/ui/Col/Col';
import { Heading } from '../../../shared/ui/Heading/Heading';
import { DoneTours } from '../../../widgets/DoneTourCard';
import cls from './HomePage.module.scss';

const HomePage = () => {
  const { t } = useTranslation('main');

  return (
    <div className={classNames(cls.homePage)}>
      <Col className={cls.DoneTripsCol} gapSize={ColGapSize.XXL}>
        <Heading>Done trips</Heading>
        <DoneTours />
      </Col>
      <Col className={cls.UpcomingTrips} gapSize={ColGapSize.XXL}>
        <Heading>Upcoming trips</Heading>
      </Col>
    </div>
  );
};

export default HomePage;
