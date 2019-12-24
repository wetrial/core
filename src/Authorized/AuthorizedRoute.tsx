import React from 'react';
import { Redirect, Route } from 'umi';
import Authorized from './Authorized';
import { TAuthorityType } from './CheckPermissions';

interface IAuthorizedRouteProps {
  currentAuthority: string;
  component: React.ComponentClass<any, any>;
  render: (props: any) => React.ReactNode;
  redirectPath: string;
  authority: TAuthorityType;
}

const AuthorizedRoute: React.FC<IAuthorizedRouteProps> = ({
  component: Component,
  render,
  authority,
  redirectPath,
  ...rest
}) => (
  <Authorized
    authority={authority}
    noMatch={
      <Route
        {...rest}
        render={() => <Redirect to={{ pathname: redirectPath }} />}
      />
    }
  >
    <div>test</div>
    <Route
      {...rest}
      render={(props: any) =>{
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  </Authorized>
);

export default AuthorizedRoute;
