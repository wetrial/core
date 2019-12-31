import React, { Component } from 'react';
import { Icon } from 'antd';
import debounce from 'lodash/debounce';
import { isBrowser } from '../kernel/utils';
import { HeaderViewProps } from './Header';
import { defaultRenderLogo } from './SiderMenu/SiderMenu';
import { IWithFalse } from '../types';

import './GlobalHeader.less';

export interface GlobalHeaderProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: React.ReactNode;
  menuRender?: HeaderViewProps['menuRender'];
  collapsedButtonRender?: IWithFalse<(collapsed?: boolean) => React.ReactNode>;
  rightContentRender?: HeaderViewProps['rightContentRender'];
}

const defaultRenderCollapsedButton = (collapsed?: boolean) => (
  <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
);

export default class GlobalHeader extends Component<GlobalHeaderProps> {
  componentWillUnmount(): void {
    this.triggerResizeEvent.cancel();
  }

  triggerResizeEvent = debounce(() => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    if (isBrowser()) {
      window.dispatchEvent(event);
    }
  });

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    if (onCollapse) {
      onCollapse(!collapsed);
    }
    this.triggerResizeEvent();
  };

  renderCollapsedButton = () => {
    const {
      collapsed,
      collapsedButtonRender = defaultRenderCollapsedButton,
      menuRender,
    } = this.props;

    if (collapsedButtonRender !== false && menuRender !== false) {
      return (
        <span className="ant-pro-global-header-trigger" onClick={this.toggle}>
          {collapsedButtonRender(collapsed)}
        </span>
      );
    }

    return null;
  };

  render(): React.ReactNode {
    const { isMobile, logo, rightContentRender } = this.props;
    return (
      <div className="ant-pro-global-header">
        {isMobile && (
          <a className="ant-pro-global-header-logo" key="logo">
            {defaultRenderLogo(logo)}
          </a>
        )}
        {this.renderCollapsedButton()}
        {rightContentRender && rightContentRender(this.props)}
      </div>
    );
  }
}
