import { useState } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Col, ColGapSize } from '../../../shared/ui/Col/Col';
import { Heading } from '../../../shared/ui/Heading/Heading';
import { DoneTours } from '../../../widgets/DoneTourCard';
import { Navbar } from '../../../widgets/Navbar';
import cls from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={classNames(cls.homePage)}>
      <Col className={classNames(cls.homePageCol)}>

        <Navbar />

        <Col className={cls.DoneTripsCol} gapSize={ColGapSize.XXL}>
          <Heading>Done trips</Heading>
          <DoneTours />
        </Col>
        <Col className={cls.UpcomingTrips} gapSize={ColGapSize.XXL}>
          <Heading>Upcoming trips</Heading>
        </Col>

      </Col>
    </div>
  );
};

export default HomePage;
