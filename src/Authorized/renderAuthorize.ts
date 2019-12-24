// eslint-disable-next-line import/no-mutable-exports
let CURRENT: string | string[] = 'NULL';
type TCurrentAuthorityType = string | string[] | (() => typeof CURRENT);
/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = <T>(Authorized: T): ((currentAuthority: TCurrentAuthorityType) => T) => (
  currentAuthority: TCurrentAuthorityType,
) => {
  if (currentAuthority) {
    if (typeof currentAuthority === 'function') {
      CURRENT = currentAuthority();
    }
    if (
      Object.prototype.toString.call(currentAuthority) === '[object String]' ||
      Array.isArray(currentAuthority)
    ) {
      CURRENT = currentAuthority as string[];
    }
  } else {
    CURRENT = 'NULL';
  }
  return Authorized;
};

export { CURRENT };

export default <T>(Authorized: T) => renderAuthorize<T>(Authorized);
