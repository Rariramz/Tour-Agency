import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Logo } from '../../../../shared/ui/Logo/Logo';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { Line } from '../../../../shared/ui/Line/Line';
import { ThemeSwitcher } from '../../../../features/theme/ChangeTheme/ui/ThemeSwitcher/ThemeSwitcher';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

type Language = {
  nativeName: string;
};

type Languages = {
  [key: string]: Language;
};

const lngs: Languages = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Русский' }
};

const Sidebar = memo(({ className }: SidebarProps) => {
  const { i18n } = useTranslation();
  const sidebarItems = getSidebarItems();

  return (
    <div
      className={classNames(
        cls.Sidebar,
        { [cls.collapsed]: false },
        className ? [className] : []
      )}
    >
      <Logo />
      <Line />
      <div className={cls.items}>
        {sidebarItems.slice(0, sidebarItems.length - 1).map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
          />
        ))}
      </div>
      <div className={cls.options}>
        <ThemeSwitcher />
        {sidebarItems.slice(sidebarItems.length - 1).map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
          />
        ))}
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export { Sidebar };
