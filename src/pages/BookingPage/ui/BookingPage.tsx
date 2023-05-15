import { classNames } from '../../../shared/lib/classNames/classNames';
import { ReactCalendar } from '../../../widgets/ReactCalendar/ui/ReactCalendar';
import { Col, ColGapSize } from '../../../shared/ui/Col/Col';
import { Heading } from '../../../shared/ui/Heading/Heading';
import cls from './BookingPage.module.scss';

const ExplorePage = () => {
  return (
    <div className={classNames(cls.explorePage)}>
      <Col className={cls.leftCol} gapSize={ColGapSize.XXL}>
        Booking Page
      </Col>
      <Col className={cls.rightCol} gapSize={ColGapSize.XXL}>
        <Heading>Calendar</Heading>
        <ReactCalendar />
      </Col>
    </div>
  );
};

export default ExplorePage;
