import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { IMenuDataItem, IRoute, IMessageDescriptor } from '../../types';

import { Settings } from '../../kernel/defaultSettings';

interface FormatterProps {
  data: IMenuDataItem[];
  menu: Settings['menu'];
  formatMessage?: (data: { id: string; defaultMessage?: string }) => string;
  parentName?: string;
  authority?: string[] | string;
}

// Conversion router to menu.
function formatter(props: FormatterProps): IMenuDataItem[] {
  const { data, menu, formatMessage, authority, parentName } = props;
  return data
    .filter(item => item && item.name && item.path)
    .map((item = { path: '' }) => {
      if (!item.name) {
        return item;
      }
      const { name } = item;
      const locale = `${parentName || 'menu'}.${name}`;
      // if enableMenuLocale use item.name,
      // close menu international
      const localeName =
        menu.locale || !formatMessage ? name : formatMessage({ id: locale, defaultMessage: name });
      const result: IMenuDataItem = {
        ...item,
        name: localeName,
        locale,
        routes: null,
      };
      if (item.routes) {
        const children = formatter({
          ...props,
          authority: item.authority || authority,
          data: item.routes,
          parentName: locale,
        });
        // Reduce memory usage
        result.children = children;
      }
      return result;
    });
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * filter menuData
 */
const defaultFilterMenuData = (menuData: IMenuDataItem[] = []): IMenuDataItem[] => {
  const result: IMenuDataItem[] = new Array<IMenuDataItem>();
  menuData
    .filter(item => item && item.name && !item.hideInMenu)
    .forEach(item => {
      if (item.children && Array.isArray(item.children) && !item.hideChildrenInMenu) {
        if (item.children.some(child => child && !!child.name)) {
          const children = defaultFilterMenuData(item.children);
          if (children.length) {
            result.push({ ...item, children });
          }
        }
      } else {
        result.push(item);
      }
    });
  return result.filter(item => item);
};

/**
 * 获取面包屑映射
 * @param IMenuDataItem[] menuData 菜单配置
 */
const getBreadcrumbNameMap = (menuData: IMenuDataItem[]): { [key: string]: IMenuDataItem } => {
  const routerMap: { [key: string]: IMenuDataItem } = {};
  const flattenMenuData: (data: IMenuDataItem[]) => void = data => {
    data.forEach(menuItem => {
      if (!menuItem) {
        return;
      }
      if (menuItem && menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export default (
  routes: IRoute[],
  menu?: { locale: boolean },
  formatMessage?: (message: IMessageDescriptor) => string,
  menuDataRender?: (menuData: IMenuDataItem[]) => IMenuDataItem[],
) => {
  let originalMenuData = memoizeOneFormatter({
    data: routes,
    formatMessage,
    menu: menu || {
      locale: false,
    },
  });
  if (menuDataRender) {
    originalMenuData = menuDataRender(originalMenuData);
  }
  const menuData = defaultFilterMenuData(originalMenuData);
  const breadcrumb = memoizeOneGetBreadcrumbNameMap(originalMenuData);
  return { breadcrumb, menuData };
};
