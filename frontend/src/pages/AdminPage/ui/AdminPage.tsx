import { classNames } from '../../../shared/lib/classNames/classNames';
import { Col, ColGapSize } from '../../../shared/ui/Col/Col';
import { ToursList } from '../../../widgets/ToursList';
import { CreateNewTour } from '../../../widgets/CreateNewTour';
import cls from './AdminPage.module.scss';
import { Row } from '../../../shared/ui/Row/Row';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../../app/store';

const AdminPage = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  if (!token)
    return (
      <Navigate
        to='/authorization'
        replace
        state={{ from: '/admin' }}
      />
    );
  if (!user) return <p role='status'>Checking account…</p>;
  if (user.role !== 'ADMIN')
    return (
      <Navigate
        to='/explore'
        replace
      />
    );
  return (
    <main className={classNames(cls.AdminPage)}>
      <header className={cls.header}>
        <p className={cls.eyebrow}>Administration</p>
        <h1>Manage tours</h1>
        <p>Review the current catalogue or publish a new trip.</p>
      </header>
      <Row className={cls.adminPageRow}>
        <Col
          className={cls.adminPageToursListCol}
          gapSize={ColGapSize.XXL}
        >
          <ToursList />
        </Col>
        <Col
          className={cls.adminPageTourEditingCol}
          gapSize={ColGapSize.XXL}
        >
          <CreateNewTour />
        </Col>
      </Row>
    </main>
  );
};

export default AdminPage;
