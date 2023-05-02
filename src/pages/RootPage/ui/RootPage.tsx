import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { Sidebar } from '../../../widgets/Sidebar';
import { Search } from '../../../widgets/Search';

export const RootPage = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback='loading...'>
        <Search onSubmit={(value) => console.log('SEARCH clicked', value)} />
        <Sidebar />

        <div>
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
};
