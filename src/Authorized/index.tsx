import Authorized, { TAuthorizedType } from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';
import check, { hasPermissions } from './CheckPermissions';
import renderAuthorize from './renderAuthorize';

Authorized.Secured = Secured;
Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = check;
Authorized.hasPermissions = hasPermissions;

const RenderAuthorize = renderAuthorize<TAuthorizedType>(Authorized);

export default RenderAuthorize;
