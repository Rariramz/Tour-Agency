import { memo, useState } from 'react';
import { getDoneTours } from '../../model/selectors/getDoneTours';
import cls from './DoneTours.module.scss';
import { Col, ColGapSize } from '../../../../shared/ui/Col/Col';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { DoneTourCard } from '../DoneTourCard/DoneTourCard';

interface DoneToursProps {
  className?: string;
}

const DoneTours = memo(({ className }: DoneToursProps) => {
  const DoneTours = getDoneTours();

  return (
    <Col className={classNames(cls.DoneTours, {}, [className ?? ''])} gapSize={ColGapSize.XL}>
        {DoneTours.map((item) => (
            <DoneTourCard
                key={item.id}
                item={item}                
            />
        ))}
    </Col>
  );
});

DoneTours.displayName = 'DoneTours';

export { DoneTours };
