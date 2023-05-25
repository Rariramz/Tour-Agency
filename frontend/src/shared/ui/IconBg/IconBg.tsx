import { ReactNode, memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './IconBg.module.scss';

interface IconBgProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const IconBg = memo((props: IconBgProps) => {
  const {
    className,
    children,
    ...otherProps
  } = props;
  return (
    <div className={classNames(cls.IconBg, {}, [className ?? ''])} {...otherProps}>
      {children}
    </div>
  );
});
