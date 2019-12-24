import { createContext } from 'react';
import { BreadcrumbListReturn } from './utils/getBreadcrumbProps';
import { Settings } from '../../defaultSettings';
import { IMenuDataItem } from '../../types';

interface RouteContextType extends Partial<Settings> {
  breadcrumb?: BreadcrumbListReturn;
  menuData?: IMenuDataItem[];
  isMobile?: boolean;
  collapsed?: boolean;
}

const routeContext: React.Context<RouteContextType> = createContext({});

export default routeContext;
