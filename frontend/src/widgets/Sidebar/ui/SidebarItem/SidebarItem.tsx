import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarItemType } from '../../model/types/sidebar';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
}

const SidebarItem = memo(({ item }: SidebarItemProps) => {
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
      </div>
    </NavLink>
  );
});

SidebarItem.displayName = 'SidebarItem';

export { SidebarItem };
