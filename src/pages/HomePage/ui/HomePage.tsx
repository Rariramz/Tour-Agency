import { useTranslation } from 'react-i18next';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ReactCalendar } from '../../../widgets/ReactCalendar/ui/ReactCalendar';
import { Col, ColGapSize } from '../../../shared/ui/Col/Col';
import { Heading } from '../../../shared/ui/Heading/Heading';
import cls from './HomePage.module.scss';

const HomePage = () => {
  const { t } = useTranslation('main');

  return (
    <div className={classNames(cls.homePage)}>
      <Col className={cls.leftCol} gapSize={ColGapSize.XXL}>
        Home Page
      </Col>
      <Col className={cls.rightCol} gapSize={ColGapSize.XXL}>
        <Heading>Upcoming trips</Heading>
        <ReactCalendar />
      </Col>
    </div>
  );
};

export default HomePage;
