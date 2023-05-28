import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarItemType } from '../../model/types/sidebar';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import CircleIcon from '../../../../shared/assets/circle.svg';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  notification?: boolean;
}

const SidebarItem = memo(({ item, notification }: SidebarItemProps) => {
  const { Icon, path, text } = item;
  return (
    <NavLink
      to={path}
      className={({ isActive, isPending }) =>
        classNames(cls.Tab, {}, [
          isActive ? cls.active : isPending ? cls.pending : ''
        ])
      }
    >
      <div className={cls.rectangle} />
      <div className={cls.item}>
        <Icon className={cls.icon} />
        <span className={cls.link}>{text}</span>
        {notification && <CircleIcon />}
      </div>
    </NavLink>
  );
});

SidebarItem.displayName = 'SidebarItem';

export { SidebarItem };
