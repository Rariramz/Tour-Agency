import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, NavLink, useNavigation } from 'react-router-dom';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { Sidebar } from '../../../widgets/Sidebar';

export const RootPage = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="loading...">
          <Sidebar />

          <div className="content-page">
            <Outlet />
          </div>
      </Suspense>
    </div>
  );
};