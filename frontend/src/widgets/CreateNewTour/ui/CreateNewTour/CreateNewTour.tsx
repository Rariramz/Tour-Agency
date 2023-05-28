import { memo, useState } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Card } from '../../../../shared/ui/Card/Card';
import { TourType } from '../../../Searchbar/model/types/searchbar';
import cls from './CreateNewTour.module.scss';
import { Heading } from '../../../../shared/ui/Heading/Heading';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button, ButtonTheme } from '../../../../shared/ui/Button/Button';
import { Col, ColAlign, ColGapSize } from '../../../../shared/ui/Col/Col';
import { useCreateTourMutation } from '../../../../entities/tour/api/toursApi';

interface CreateNewTourProps {
  className?: string;
}

const CreateNewTour = memo(({ className }: CreateNewTourProps) => {
  const [name, setName] = useState('');
  const [createTour, result] =  useCreateTourMutation();

  return (
    <Card className={classNames(cls.CreateNewTour, { }, [className ?? ''])}>
      <Col gapSize={ColGapSize.XXL} align={ColAlign.CENTER}>
        <Heading>Add tour</Heading>
        <Input placeholder={'Name'} value={name} onChange={setName} />
        <Button onClick={() => createTour({name})} theme={ButtonTheme.CONTAIN}>CREATE</Button>
      </Col>
    </Card>
  );
});

CreateNewTour.displayName = 'CreateNewTour';

export { CreateNewTour };
