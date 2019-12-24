import './index.less';

import React from 'react';
import classNames from 'classnames';

export interface GlobalFooterProps {
  links?: {
    key?: string;
    title: React.ReactNode;
    href: string;
    blankTarget?: boolean;
  }[];
  copyright?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default ({ className, links, copyright }: GlobalFooterProps) => {
  const clsString = classNames('wetrial-global-footer', className);
  return (
    <footer className={clsString}>
      {links && (
        <div className="wetrial-global-footer-links">
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className="wetrial-global-footer-copyright">{copyright}</div>}
    </footer>
  );
};
