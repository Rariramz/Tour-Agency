import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { Sidebar } from '../../../widgets/Sidebar';

export const RootPage = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback='loading...'>
        <Sidebar />
        <div className='content'>
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
};
