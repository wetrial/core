import CheckPermissions, {
  TAuthorityType,
  hasPermissions,
} from './CheckPermissions';
import Secured from './Secured';
import AuthorizedRoute from './AuthorizedRoute';
import React from 'react';

interface IAuthorizedProps {
  authority: TAuthorityType;
  noMatch?: React.ReactNode;
}

export type TAuthorizedType = React.FC<IAuthorizedProps> & {
  Secured: typeof Secured;
  check: typeof CheckPermissions;
  AuthorizedRoute: typeof AuthorizedRoute;
  hasPermissions: typeof hasPermissions;
};

const Authorized: React.FC<IAuthorizedProps> = ({
  children,
  authority,
  noMatch = null,
}) => {
  const childrenRender: React.ReactNode =
    typeof children === 'undefined' ? null : children;
  const dom = CheckPermissions(authority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized as TAuthorizedType;
