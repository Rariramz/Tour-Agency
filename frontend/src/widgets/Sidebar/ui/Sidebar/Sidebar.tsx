import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { RootState } from '../../../../app/store';
import { Logo } from '../../../../shared/ui/Logo/Logo';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { Line } from '../../../../shared/ui/Line/Line';
import { ThemeSwitcher } from '../../../../features/theme/ChangeTheme/ui/ThemeSwitcher/ThemeSwitcher';
import LogoutIcon from '../../../../shared/assets/routes/logout.svg';
import ExploreIcon from '../../../../shared/assets/routes/explore.svg';
import BookingIcon from '../../../../shared/assets/routes/booking.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

const Sidebar = memo(({ className }: SidebarProps) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const sidebarItems = getSidebarItems();
  return (
    <div className={classNames(cls.Sidebar, {}, [className ?? ''])}>
      <Logo />
      <Line />
      <div className={cls.items}>
        {sidebarItems.slice(0, -1).map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
          />
        ))}
        {token && (
          <SidebarItem
            item={{ path: '/booking', Icon: BookingIcon, text: 'Bookings' }}
          />
        )}
        {user?.role === 'ADMIN' && (
          <SidebarItem
            item={{ path: '/admin', Icon: ExploreIcon, text: 'Admin' }}
          />
        )}
      </div>
      <div className={cls.options}>
        <ThemeSwitcher />
        {token ? (
          <SidebarItem item={sidebarItems[sidebarItems.length - 1]} />
        ) : (
          <SidebarItem
            item={{ path: '/authorization', Icon: LogoutIcon, text: 'Sign in' }}
          />
        )}
      </div>
    </div>
  );
});
Sidebar.displayName = 'Sidebar';
export { Sidebar };
