import { ReactNode, memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './IconBg.module.scss';

interface IconBgProps {
  className?: string;
  children?: ReactNode;
}

export const IconBg = memo((props: IconBgProps) => {
  const {
    className,
    children,
  } = props;
  return (
    <div className={classNames(cls.IconBg, {}, [className ?? ''])}>
      {children}
    </div>
  );
});
