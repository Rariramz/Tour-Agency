import { AppRoutes, RoutePath } from '../../../../shared/config/route/route';
import HomeIcon from '../../../../shared/assets/routes/home.svg';
import ExploreIcon from '../../../../shared/assets/routes/explore.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = () => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath[AppRoutes.HOME],
      Icon: HomeIcon,
      text: 'Home'
    },
    {
      path: RoutePath[AppRoutes.EXPLORE],
      Icon: ExploreIcon,
      text: 'Explore'
    }
  ];
  return sidebarItemsList;
};
