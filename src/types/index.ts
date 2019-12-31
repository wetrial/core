// export interface ILinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
//   to: H.LocationDescriptor;
//   replace?: boolean;
//   innerRef?: React.Ref<HTMLAnchorElement>;
// }

export type IWithFalse<T> = T | false;

/**
 * Key value简写
 */
export interface IKeyValue<T = any> {
  [key: string]: T;
}

export interface IMenuDataItem extends IKeyValue {
  authority?: string[] | string;
  children?: IMenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  path: string;
}

export interface IRoute extends IMenuDataItem {
  routes?: IRoute[];
}

export interface IMessageDescriptor {
  id: any;
  description?: string;
  defaultMessage?: string;
}
