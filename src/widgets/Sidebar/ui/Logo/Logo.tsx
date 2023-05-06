import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import logo from '../../../../shared/assets/logo.png';
import cls from './Logo.module.scss';

interface LogoProps {
  className?: string;
  showName?: boolean;
}

const Logo = memo(({ className, showName = true }: LogoProps) => {
  return (
    <div className={classNames(cls.Logo, {}, [className ?? ''])}>
      <img src={logo} />
      {showName && <span className={cls.brandName}>Traveloo</span>}
    </div>
  );
});

Logo.displayName = 'Logo';

export { Logo };
