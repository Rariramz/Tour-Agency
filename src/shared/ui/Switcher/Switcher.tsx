import { memo } from 'react';
import cls from './Switcher.module.scss';
import { classNames } from '../../lib/classNames/classNames';

interface SwitcherProps {
  className?: string;
  disabled?: boolean;
}

const Switcher = memo((props: SwitcherProps) => {
    const {
        className,
        disabled,
        ...otherProps
    } = props;

  return (
    <div
        className={classNames(cls.Switcher, {}, [className ?? ''])}
        {...otherProps}
    >
      SWITCHER
    </div>
  );
});

Switcher.displayName = 'Switcher';

export { Switcher };
