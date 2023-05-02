import React from 'react';
import { AppRoutes } from '../../../../shared/config/route/route';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  authOnly?: boolean;
}
