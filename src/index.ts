// 只导出高频使用的，其他一律通过import {} from '@wetrial/core/es/xxxx' 形式使用

export { request, get, post, put, del, patch, head, options } from './request';

export { default as store } from './store';

export { IKeyValue, IWithFalse } from './types';
