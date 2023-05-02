import { memo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../app/providers/ThemeProvider';
import { Button } from '../../../../shared/ui/Button/Button';
import { Logo } from '../../../Logo';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { Line } from '../../../../shared/ui/Line/Line';

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
  const { theme, toggleTheme } = useTheme();
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
      <div className={cls.items} >
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
          />
        ))}
      </div>
      <div className={cls.items}>
        <Button onClick={toggleTheme}>
          {theme}
        </Button>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export { Sidebar };
