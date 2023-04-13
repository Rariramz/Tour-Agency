import React from 'react';
import cls from './styles.module.scss';
import globe from './globe.svg';
import { Outlet, NavLink, useNavigation } from 'react-router-dom';
import 'index.scss';

export const App: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <nav>
        <ul>
          {[1, 2].map((id) => (
            <li key={id}>
              <NavLink
                to={`${id}`}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "active"
                    : isPending
                    ? "pending"
                    : ""
                }
              >
                Page {id}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <h1 className={cls.h1}>
        {navigation.state === "loading" && <h2>LOADING...</h2>}
        <Outlet />
        <img
          src={globe as string}
          width={50}
        />
      </h1>
    </>
  );
};
