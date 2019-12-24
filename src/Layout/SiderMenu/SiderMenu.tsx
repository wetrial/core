import './index.less';

import React, { Component } from 'react';

import { Layout } from 'antd';
import classNames from 'classnames';
import BaseMenu, { BaseMenuProps } from './BaseMenu';
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';
import ScrollBar from '../../ScrollBar';

const { Sider } = Layout;

let firstMount = true;

export const defaultRenderLogo = (logo: React.ReactNode): React.ReactNode => {
  if (typeof logo === 'string') {
    return <img src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};

export interface SiderMenuProps
  extends Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ['onCollapse']>> {
  logo?: React.ReactNode;
  siderWidth?: number;
}

interface SiderMenuState {
  pathname?: string;
  openKeys?: string[];
  flatMenuKeysLen?: number;
}

export default class SiderMenu extends Component<SiderMenuProps, SiderMenuState> {
  static defaultProps: Partial<SiderMenuProps> = {
    flatMenuKeys: [],
    onCollapse: () => undefined,
    isMobile: false,
    openKeys: [],
    collapsed: false,
    handleOpenChange: () => undefined,
    menuData: [],
    onOpenChange: () => undefined,
  };

  static getDerivedStateFromProps(
    props: SiderMenuProps,
    state: SiderMenuState,
  ): SiderMenuState | null {
    const { pathname, flatMenuKeysLen } = state;
    const { location = { pathname: '/' }, flatMenuKeys = [] } = props;
    if (location.pathname !== pathname || flatMenuKeys.length !== flatMenuKeysLen) {
      return {
        pathname: location.pathname,
        flatMenuKeysLen: flatMenuKeys.length,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }

  constructor(props: SiderMenuProps) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
    };
  }

  componentDidMount(): void {
    firstMount = false;
  }

  handleOpenChange: (openKeys: string[]) => void = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    if (moreThanOne) {
      this.setState({
        openKeys: [openKeys.pop()].filter(item => item) as string[],
      });
    } else {
      this.setState({ openKeys: [...openKeys] });
    }
  };

  isMainMenu: (key: string) => boolean = key => {
    const { menuData = [] } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  render(): React.ReactNode {
    const {
      logo,
      collapsed,
      title,
      fixSiderbar,
      onCollapse,
      theme,
      siderWidth = 256,
      isMobile,
      layout,
    } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed || layout !== 'sidemenu' ? {} : { openKeys };
    const siderClassName = classNames('ant-pro-sider-menu-sider', {
      'fix-sider-bar': fixSiderbar,
      light: theme === 'light',
    });
    return (
      <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={collapse => {
          if (firstMount || !isMobile) {
            if (onCollapse) {
              onCollapse(collapse);
            }
          }
        }}
        width={siderWidth}
        theme={theme}
        className={siderClassName}
      >
        <div className="ant-pro-sider-menu-logo" id="logo">
          <a>
            {defaultRenderLogo(logo)}
            <h1>{title}</h1>
          </a>
        </div>
        <ScrollBar
          universal
          hideTracksWhenNotNeeded
          autoHide
          autoHeight
          autoHeightMin="calc(100vh - 64px)"
          autoHeightMax="calc(100vh - 64px)"
        >
          <BaseMenu
            {...this.props}
            mode="inline"
            handleOpenChange={this.handleOpenChange}
            onOpenChange={this.handleOpenChange}
            style={{ padding: '16px 0', width: '100%', height: 'auto', overflow: 'hidden' }}
            {...defaultProps}
          />
        </ScrollBar>
      </Sider>
    );
  }
}
