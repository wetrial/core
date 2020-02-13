import storeWithExp from './store';

const preFix = 'WETRIAL';
const TokenName = `${preFix}.TOKEN`;
const PermisssName = `${preFix}.PERMISSIONS`;

/**
 * 存储token
 * @param {string} token 要存储的token值
 * @param {number} exp 过期时长 秒
 */
export const setToken = (token: string, exp?: number): void => {
  storeWithExp.set(TokenName, token, exp);
};

/**
 * 获取当前用户的token
 */
export const getToken = (): string => {
  return storeWithExp.get(TokenName);
};

/**
 * 清除当前用户的token、以及权限
 */
export const clearToken = (): void => {
  storeWithExp.remove(TokenName);
  storeWithExp.remove(PermisssName);
};

/**
 * 获取当前用户的权限列表
 */
export const getPermissions = (str?: string): string[] => {
  const permissionString = typeof str === 'undefined' ? storeWithExp.get(PermisssName) : str;
  let permission;
  try {
    permission = JSON.parse(permissionString as string);
  } catch (e) {
    permission = permissionString;
  }
  if (typeof permission === 'string') {
    return [permission];
  }
  return permission;
};

/**
 * 设置当前用户的权限列表
 */
export const setPermissions = (permissions?: string | string[]): void => {
  const tempPermissions = typeof permissions === 'string' ? [permissions] : permissions;
  return storeWithExp.set(PermisssName, tempPermissions);
};

/**
 * 清除权限值
 */
export const clearPermissions = (): void => {
  storeWithExp.remove(PermisssName);
};
