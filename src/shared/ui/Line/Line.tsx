import { memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Line.module.scss';

interface LineProps {
  className?: string;
}

const Line = memo((props: LineProps) => {
  const { className, ...otherProps } = props;

  return (
    <div
      className={classNames(cls.Line, {}, [className ?? ''])}
      {...otherProps}
    />
  );
});

Line.displayName = 'Line';

export { Line };
