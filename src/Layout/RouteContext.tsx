import { createContext } from 'react';
import { BreadcrumbListReturn } from './utils/getBreadcrumbProps';
import { ISettings } from '../kernel/defaultSettings';
import { IMenuDataItem } from '../types';

interface RouteContextType extends Partial<ISettings> {
  breadcrumb?: BreadcrumbListReturn;
  menuData?: IMenuDataItem[];
  isMobile?: boolean;
  collapsed?: boolean;
}

const routeContext: React.Context<RouteContextType> = createContext({});

export default routeContext;
