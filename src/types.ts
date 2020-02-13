export type IWithFalse<T> = T | false;

/**
 * Key value简写
 */
export interface IKeyValue<T = any> {
  [key: string]: T;
}
