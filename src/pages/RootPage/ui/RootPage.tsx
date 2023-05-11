import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { Sidebar } from '../../../widgets/Sidebar';
import cls from './RootPage.module.scss';

export const RootPage = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback='loading...'>
        <Sidebar className={cls.sidebar} />
        <div className={cls.content}>
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
};
