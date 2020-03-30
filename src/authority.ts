import storeWithExp from './store';

const preFix = 'WETRIAL';
let token_name = `${preFix}.TOKEN`;

export const configTokenName = (tokenName: string) => {
  token_name = tokenName;
};

/**
 * 存储token
 * @param {string} token 要存储的token值
 * @param {number} exp 过期时长 秒
 */
export const setToken = (token: string, exp?: number): void => {
  storeWithExp.set(token_name, token, exp);
};

/**
 * 获取当前用户的token
 */
export const getToken = (): string => {
  return storeWithExp.get(token_name);
};

/**
 * 清除当前用户的token、以及权限
 */
export const clearToken = (): void => {
  storeWithExp.remove(token_name);
  // storeWithExp.remove(PermisssName);
};

// /**
//  * 获取当前用户的权限列表
//  */
// export const getPermissions = (str?: string): string[] => {
//   const permissionString = typeof str === 'undefined' ? storeWithExp.get(PermisssName) : str;
//   let permission;
//   try {
//     permission = JSON.parse(permissionString as string);
//   } catch (e) {
//     permission = permissionString;
//   }
//   if (typeof permission === 'string') {
//     return [permission];
//   }
//   return permission;
// };

// /**
//  * 设置当前用户的权限列表
//  */
// export const setPermissions = (permissions?: string | string[]): void => {
//   const tempPermissions = typeof permissions === 'string' ? [permissions] : permissions;
//   return storeWithExp.set(PermisssName, tempPermissions);
// };

// /**
//  * 清除权限值
//  */
// export const clearPermissions = (): void => {
//   storeWithExp.remove(PermisssName);
// };

// export const getTenant = (): string | number => {
//   return storeWithExp.get(TENANT_KEY);
// };

// export const setTenant = (tenantId:number|string): void => {
//   storeWithExp.set(TENANT_KEY, tenantId);
// };

// export const clearTenant = (): void => {
//   storeWithExp.remove(TENANT_KEY);
// };
