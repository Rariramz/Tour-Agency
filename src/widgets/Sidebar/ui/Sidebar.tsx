import { memo } from 'react';
import cls from './Sidebar.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '../../../shared/config/route/route';
import { useTheme } from '../../../app/providers/ThemeProvider';

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
      <div>
        {Object.keys(lngs).map((lng: string) => (
          <button
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal'
            }}
            type='submit'
            onClick={() => {
              i18n.changeLanguage(lng).catch(console.log);
            }}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div>
      <button onClick={toggleTheme}>{theme}</button>
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
