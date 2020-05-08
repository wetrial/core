import { parse } from 'qs';

import { reduce } from 'lodash';
import { IKeyValue } from './types';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

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
export const isUrl = (path: string): boolean => reg.test(path);

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
 * 将数组对象转换成object对象
 * @param items 要转换的数组
 * @param key 作为key的属性名 默认为 'label'
 * @param value  作为值的属性名 默认为'value'
 * @example  listToFlat([{label:'label1',value:'001'},{label:'label2',value:'002'}],'value','label')==>{'001':'label1','002':'label2'}
 * @returns IKeyValue
 * @summary 建议配合memoize方法使用避免不必要的转换，提高性能
 */
export function listToFlat<T>(items: T[], key: keyof T, text: keyof T): IKeyValue<keyof T> {
  return reduce(
    items,
    (redu: IKeyValue<keyof T>, item) => {
      const reduKey = item[key];
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      redu[reduKey] = item[text];
      return redu;
    },
    {},
  );
}

/**
 * 判断是否是浏览器环境
 */
export const isBrowser = () => typeof window !== 'undefined';
