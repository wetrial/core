import Authorized, { TAuthorizedType } from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';
import check, { hasPermissions } from './CheckPermissions';
import renderAuthorize from './renderAuthorize';
import { getPermissions } from '../kernel/authority';

Authorized.Secured = Secured;
Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = check;
Authorized.hasPermissions = hasPermissions;

const RenderAuthorized = renderAuthorize<TAuthorizedType>(Authorized);

// export default RenderAuthorized;

// eslint-disable-next-line import/no-mutable-exports
let AppAuthorized = RenderAuthorized(getPermissions());

// Reload the rights component
const reloadAuthorized = () => {
  AppAuthorized = RenderAuthorized(getPermissions());
};

export { reloadAuthorized };
export default AppAuthorized;
