import { parse } from 'qs';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

// https://github.com/moment/moment/issues/3650
export function interopDefault(m: any) {
  return m.default || m;
}

/**
 * 将url拆分成列表
 * @param url 要转换的url
 * @returns 拆分后的数组
 * @example /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
 */
export function urlToList(url?: string): string[] {
  if (!url || url === '/') {
    return ['/'];
  }
  const urlList = url.split('/').filter(i => i);
  return urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`);
}

/**
 * 判断对象是否是Promise类型
 * @param {any} obj 要判断的对象
 * @returns {boolean} 如果是 返回true，否则 false
 */
export function isPromise(obj: any): boolean {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

/**
 * 判断给定的字符串是否是个url地址
 * @param path 地址
 * @returns {boolean} 如果是 返回 true，否则 false
 */
export function isUrl(path: string): boolean {
  return reg.test(path);
}

/**
 * 解析url后的查询字符串并转化成object对象
 * @param data 要解析的字符串，没有则默认使用location.href
 */
export function getQuery(query?: string): { [key: string]: string } {
  let queryUrl = query || '';
  if (queryUrl.indexOf('?') !== -1) {
    [, queryUrl] = queryUrl.split('?');
  }
  return parse(queryUrl);
}

/**
 * 判断是否是浏览器环境
 */
export const isBrowser = () => typeof window !== 'undefined';
