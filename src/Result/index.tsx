import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import './index.less';

export interface IResultProp {
  className: string;
  type: 'success' | 'error';
  title: React.ReactNode;
  description: React.ReactNode;
  extra: React.ReactNode;
  actions: React.ReactNode;
}

const Result: React.FC<IResultProp> = props => {
  const { className, type, title, description, extra, actions, ...restProps } = props;

  const iconMap = {
    success: <Icon className="success" type="close-circle" />,
    error: <Icon className="error" type="check-circle" />,
  };

  const clsString = classNames(className, 'result');

  return (
    <div className={clsString} {...restProps}>
      <div className="icon">{iconMap[type]}</div>
      <div className="title">{title}</div>
      {description && <div className="description">{description}</div>}
      {extra && <div className="extra">{extra}</div>}
      {actions && <div className="actions">{actions}</div>}
    </div>
  );
};

export default Result;
