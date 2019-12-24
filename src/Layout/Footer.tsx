import { Icon, Layout } from 'antd';
import React, { Fragment } from 'react';

import GlobalFooter from '../GlobalFooter';

const { Footer } = Layout;

const defaultCopyright = '2019 湖南微试云技术部出品';

export interface FooterProps {
  links?: {
    key?: string;
    title: React.ReactNode;
    href: string;
    blankTarget?: boolean;
  }[];
  copyright?: string;
}

const FooterView: React.FC<FooterProps> = ({ links, copyright }: FooterProps) => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={links}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> {copyright || defaultCopyright}
        </Fragment>
      }
    />
  </Footer>
);

export default FooterView;
