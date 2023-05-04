import { memo } from 'react';
import cls from './ThemeSwitcher.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import ThemeSwitcherIcon from '../../../shared/assets/toggle-off-circle.svg';
import { useTheme } from '../../../app/providers/ThemeProvider';

interface ThemeSwitcherProps {
  className?: string;
  disabled?: boolean;
}

const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const {
        className,
        disabled,
        ...otherProps
    } = props;
  const { toggleTheme } = useTheme();

  return (
    <div
        className={classNames(cls.ThemeSwitcher, {}, [className ?? ''])}
        {...otherProps}
        onClick={toggleTheme}
    >
     <ThemeSwitcherIcon /> 
     <span>Dark mode</span>
    </div>
  );
});

ThemeSwitcher.displayName = 'ThemeSwitcher';

export { ThemeSwitcher };
