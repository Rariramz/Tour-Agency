import { memo } from 'react';
import cls from './Sidebar.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '../../../shared/config/route/route';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';
import { Select } from '../../../shared/ui/Select/Select';
import { Logo } from '../../Logo';

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

  return (
    <div
      className={classNames(
        cls.Sidebar,
        { [cls.collapsed]: false },
        className ? [className] : []
      )}
    >
      <Logo />
      <Select value={'selec1'} options={[ {value: 'select1', content: 'select1'}, {value: 'select2', content: 'select2'}]} />
      <div>
        {Object.keys(lngs).map((lng: string) => (
          <Button
            key={lng}
            onClick={() => {
              i18n.changeLanguage(lng).catch(console.log);
            }}
            theme={ButtonTheme.CONTAIN}
            square={true}
          >
            {lngs[lng].nativeName}
          </Button>
        ))}
      </div>
      <Button onClick={toggleTheme}>
        {theme}
      </Button>
      <ul>
        {Object.entries(RoutePath).map(([routeName, path]) => (
          <li key={path}>
            <NavLink to={path}>{routeName}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export { Sidebar };
