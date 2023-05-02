import { ReactComponent as home } from '../../assets/routes/home.svg';
import { ReactComponent as booking } from '../../assets/routes/booking.svg';
import { ReactComponent as explore } from '../../assets/routes/explore.svg';
import { ReactComponent as message } from '../../assets/routes/message.svg';
import { ReactComponent as support } from '../../assets/routes/support.svg';
import { ReactComponent as setting } from '../../assets/routes/setting.svg';
import { AppRoutes } from '../../../../shared/config/route/route';

export const routeIcons: Record<AppRoutes, React.FC> = {
  [AppRoutes.HOME]: home,
  [AppRoutes.EXPLORE]: explore,
  [AppRoutes.NOT_FOUND]: support,
};