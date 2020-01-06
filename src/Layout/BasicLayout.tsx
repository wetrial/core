import React, { useState } from 'react';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/es/breadcrumb';
import DocumentTitle from 'react-document-title';
import { Layout } from 'antd';
import Header, { HeaderViewProps } from './Header';
import { RouterTypes } from 'umi';
import { useResponsive } from '@wetrial/hooks';
import { IMenuDataItem, IMessageDescriptor, IRoute, IWithFalse } from '../types';
import defaultGetPageTitle, { GetPageTitleProps } from './utils/getPageTitle';
import { ISettings } from '../kernel/defaultSettings';
import getLocales, { localeType } from '../locales';
import { BaseMenuProps } from './SiderMenu/BaseMenu';
import Footer from './Footer';
import RouteContext from './RouteContext';
import SiderMenu from './SiderMenu';
import { SiderMenuProps } from './SiderMenu/SiderMenu';
import { getBreadcrumbProps } from './utils/getBreadcrumbProps';
import getMenuData from './utils/getMenuData';

import './BasicLayout.less';

const { Content } = Layout;

export interface BasicLayoutProps
  extends Partial<RouterTypes<IRoute>>,
    SiderMenuProps,
    HeaderViewProps,
    Partial<ISettings> {
  logo?: React.ReactNode | IWithFalse<() => React.ReactNode>;
  locale?: localeType;
  onCollapse?: (collapsed: boolean) => void;
  headerRender?: IWithFalse<(props: HeaderViewProps) => React.ReactNode>;
  footerRender?: IWithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  menuRender?: IWithFalse<(props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode>;
  menuItemRender?: BaseMenuProps['menuItemRender'];
  pageTitleRender?: IWithFalse<typeof defaultGetPageTitle>;
  formatMessage?: (message: IMessageDescriptor) => string;
  menuDataRender?: (menuData: IMenuDataItem[]) => IMenuDataItem[];
  breadcrumbRender?: (routers: AntdBreadcrumbProps['routes']) => AntdBreadcrumbProps['routes'];
  itemRender?: AntdBreadcrumbProps['itemRender'];
  breadcrumbNameMap: {
    [path: string]: IMenuDataItem;
  };
  settings: ISettings;
}

const headerRender = (props: BasicLayoutProps): React.ReactNode => {
  if (props.headerRender === false) {
    return null;
  }
  return <Header {...props} />;
};

const footerRender = (props: BasicLayoutProps): React.ReactNode => {
  if (props.footerRender === false) {
    return null;
  }
  if (props.footerRender) {
    return props.footerRender({ ...props }, <Footer />);
  }
  return <Footer />;
};

const renderSiderMenu = (props: BasicLayoutProps): React.ReactNode => {
  const { layout, isMobile, menuRender } = props;
  if (props.menuRender === false) {
    return null;
  }
  if (layout === 'topmenu' && !isMobile) {
    return null;
  }
  if (menuRender) {
    return menuRender(props, <SiderMenu {...props} />);
  }

  return <SiderMenu {...props} />;
};

const defaultPageTitleRender = (pageProps: GetPageTitleProps, props: BasicLayoutProps): string => {
  const { pageTitleRender } = props;
  if (pageTitleRender === false) {
    return props.title || '';
  }
  if (pageTitleRender) {
    const title = pageTitleRender(pageProps);
    if (typeof title === 'string') {
      return title;
    }

    // eslint-disable-next-line no-console
    console.warn('wetrial-layout: renderPageTitle return value should be a string');
  }
  return defaultGetPageTitle(pageProps);
};

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumb: { [path: string]: IMenuDataItem };
};

function useCollapsed(
  collapsed: boolean | undefined,
  onCollapse: BasicLayoutProps['onCollapse'],
): [boolean, BasicLayoutProps['onCollapse']] {
  const [nativeCollapsed, setCollapsed] = useState(false);
  if (collapsed !== undefined && onCollapse) {
    return [collapsed, onCollapse];
  }
  return [nativeCollapsed, setCollapsed];
}

const getPaddingLeft = (
  hasLeftPadding: boolean,
  collapsed: boolean,
  siderWidth: number,
): number | undefined => {
  if (hasLeftPadding) {
    return collapsed ? 80 : siderWidth;
  }
  return undefined;
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { screen } = useResponsive();

  const {
    children,
    onCollapse,
    location = { pathname: '/' },
    fixedHeader,
    fixSiderbar,
    navTheme,
    layout: PropsLayout,
    route = {
      routes: [],
    },
    siderWidth = 256,
    menu,
    menuDataRender,
  } = props;

  const formatMessage = ({
    id,
    defaultMessage,
    ...rest
  }: {
    id: string;
    defaultMessage?: string;
  }): string => {
    if (props.formatMessage) {
      return props.formatMessage({
        id,
        defaultMessage,
        ...rest,
      });
    }
    const locales = getLocales();
    if (locales[id]) {
      return locales[id];
    }
    if (defaultMessage) {
      return defaultMessage as string;
    }
    return id;
  };

  const { routes = [] } = route;
  const { breadcrumb, menuData } = getMenuData(routes, menu, formatMessage, menuDataRender);

  /**
   * init variables
   */
  const isMobile = screen === 'xs' || screen === 'sm';

  // If it is a fix menu, calculate padding
  // don't need padding in phone mode
  const hasLeftPadding = fixSiderbar && PropsLayout !== 'topmenu' && !isMobile;

  // whether to close the menu
  const [collapsed, handleMenuCollapse] = useCollapsed(props.collapsed, onCollapse);

  // Splicing parameters, adding menuData and formatMessage in props
  const defaultProps = {
    ...props,
    formatMessage,
    breadcrumb,
  };

  // gen page title
  const pageTitle = defaultPageTitleRender(
    {
      pathname: location.pathname,
      ...defaultProps,
    },
    props,
  );

  // gen breadcrumbProps, parameter for pageHeader
  const breadcrumbProps = getBreadcrumbProps({
    ...props,
    breadcrumb,
  });

  return (
    <DocumentTitle title={pageTitle}>
      <div className={`screen-${screen} ant-design-pro basicLayout`}>
        <Layout>
          {renderSiderMenu({
            menuData,
            handleMenuCollapse,
            isMobile,
            theme: navTheme,
            collapsed,
            ...defaultProps,
          })}
          <Layout
            style={{
              paddingLeft: getPaddingLeft(!!hasLeftPadding, collapsed, siderWidth),
              minHeight: '100vh',
            }}
          >
            {headerRender({
              menuData,
              handleMenuCollapse,
              isMobile,
              collapsed,
              ...defaultProps,
            })}
            <Content
              className="ant-pro-basicLayout-content"
              style={!fixedHeader ? { paddingTop: 0 } : {}}
            >
              <RouteContext.Provider
                value={{
                  breadcrumb: breadcrumbProps,
                  ...props,
                  menuData,
                  isMobile,
                  collapsed,
                  title: pageTitle.split('-')[0].trim(),
                }}
              >
                {children}
              </RouteContext.Provider>
            </Content>
            {footerRender({
              isMobile,
              collapsed,
              ...defaultProps,
            })}
          </Layout>
        </Layout>
      </div>
    </DocumentTitle>
  );
};
export default BasicLayout;
