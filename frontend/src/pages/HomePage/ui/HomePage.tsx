import { useState } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Col, ColGapSize } from '../../../shared/ui/Col/Col';
import { Heading } from '../../../shared/ui/Heading/Heading';
import { DoneTours } from '../../../widgets/DoneTourCard';
import { Navbar } from '../../../widgets/Navbar';
import cls from './HomePage.module.scss';
import { Row } from '../../../shared/ui/Row/Row';
import { TourCard } from '../../../widgets/TourCard';
import { ReactCalendar } from '../../../shared/ui/ReactCalendar/ReactCalendar';
import { ToursList } from '../../../widgets/ToursList';
import { CreateNewTour } from '../../../widgets/CreateNewTour';

const HomePage = () => {
  return (
    <div className={classNames(cls.homePage)}>
      <Col className={classNames(cls.homePageCol)}>
        <Navbar />
        <CreateNewTour />
        <ToursList />
        {/* <Row>
          <Col className={cls.UpcomingTrips} gapSize={ColGapSize.XXL}>
            <Heading>Upcoming trips</Heading>
            <TourCard />
          </Col>
          <Col className={cls.UpcomingTrips} gapSize={ColGapSize.XXL}>
            <Heading>Calendar</Heading>
            <ReactCalendar />
          </Col>
        </Row>

        <Col className={cls.DoneTripsCol} gapSize={ColGapSize.XXL}>
          <Heading>Done trips</Heading>
          <DoneTours />
        </Col>
        <Col className={cls.UpcomingTrips} gapSize={ColGapSize.XXL}>
          <Heading>Upcoming trips</Heading>
        </Col> */}
      </Col>
    </div>
  );
};

export default HomePage;
