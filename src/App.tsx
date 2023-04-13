import React from 'react';
import cls from './styles.module.scss';
import globe from './globe.svg';

export const App: React.FC = () => {
  return (
    <h1 className={cls.h1}>
      APP
      <img
        src={globe as string}
        width={50}
      />
    </h1>
  );
};
