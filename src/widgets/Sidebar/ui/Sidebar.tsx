import { t } from 'i18next';
import React, { memo, useState } from 'react';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import cls from './Sidebar.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  className?: string;
}

const lngs: any = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Русский' }
};

export const Sidebar = memo(({ className }: SidebarProps) => {
  const { t, i18n } = useTranslation();

  return (
    <div data-testid="sidebar" className={classNames(cls.Sidebar, { [cls.collapsed]: false }, [className!])}>
      <div>
        {Object.keys(lngs).map((lng: string) => (
          <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
            {lngs[lng].nativeName}
          </button>
        ))}
      </div>
      <ul>
        {Object.entries(RoutePath).map(([routeName, routePath]) => (
          <li>
            <NavLink to={routePath}>{routeName}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
});