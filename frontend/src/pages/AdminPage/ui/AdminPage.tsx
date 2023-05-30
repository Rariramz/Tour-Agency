import { classNames } from '../../../shared/lib/classNames/classNames';
import { Col, ColGapSize } from '../../../shared/ui/Col/Col';
import { ToursList } from '../../../widgets/ToursList';
import { CreateNewTour } from '../../../widgets/CreateNewTour';
import cls from './AdminPage.module.scss';
import { Row } from '../../../shared/ui/Row/Row';

const AdminPage = () => {
  return (
    <div className={classNames(cls.AdminPage)}>
      <Row className={cls.adminPageRow}>
        <Col className={cls.adminPageToursListCol} gapSize={ColGapSize.XXL}>
          <ToursList />
        </Col>
        <Col className={cls.adminPageTourEditingCol} gapSize={ColGapSize.XXL}>
          <CreateNewTour />
        </Col>
      </Row>
    </div>
  );
};

export default AdminPage;
