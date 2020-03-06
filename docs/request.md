---
title: ajax
order: 1
group:
  title: ajax
  path: /request
  order: 5
nav:
  title: ajax
  path: /request
  order: 6
---

# request ajax 请求

提供 ajax 请求的封装,包括请求拦截、响应拦截、异常处理等(不建议直接使用)

> 通常会在项目中提取一层，如:src/utils/request.ts

```ts | pure
import {
  addRequestInterceptor,
  addResponseInterceptor,
  commonRequestInterceptor,
  commonResponseInterceptor,
} from '@wetrial/core/request';

// 添加请求拦截器(自动带上Authority请求头)
addRequestInterceptor(...commonRequestInterceptor);
// 添加响应拦截器(处理tip、全局错误等)
addResponseInterceptor(...commonResponseInterceptor);

export { request, get, post, put, patch } from '@wetrial/core/request';
```

## 使用方式

```tsx |pure
import { get, post, request } from '@/utils/request';

const result = await get('');
```

## Methods

| 名称 | 描述 | 类型 |
| --- | --- | --- |
| get | 发送 get 请求，返回 Promise 类型的泛型 T，[IRequestOption](#irequestoption) | `(opt:IRequestOption|string):Promise<T>` |
| post | 发送 post 请求，返回 Promise 类型的泛型 T，[IRequestOption](#irequestoption) | `(opt:IRequestOption):Promise<T>` |
| put | 发送 put 请求，返回 Promise 类型的泛型 T，[IRequestOption](#irequestoption) | `(opt:IRequestOption):Promise<T>` |
| del | 发送 delete 请求，返回 Promise 类型的泛型 T，[IRequestOption](#irequestoption) | `(opt:IRequestOption):Promise<T>` |
| patch | 发送 patch 请求，返回 Promise 类型的泛型 T，[IRequestOption](#irequestoption) | `(opt:IRequestOption):Promise<T>` |
| request | 各类请求的基类，get、post、put、del、patch 都是在该方法的基础上进行扩展的(比如设置 method) | `(opt:IRequestOption):Promise<T>` |
| instance | axios 的实例 |  |
| commonRequestInterceptor | 通用请求拦截器，会将 getToken 获取到的值设置到请求头的 Authorization |  |
| commonResponseInterceptor | 通用响应拦截器，会处理`showTip`、未授权请求、数据转换等 |  |
| addRequestInterceptor | 添加请求拦截器 |  |
| ejectRequestInterceptor | 删除请求拦截器 |  |
| addResponseInterceptor | 添加响应拦截器 |  |
| ejectResponseInterceptor | 删除响应拦截器 |  |

### IRequestOption

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| showTip | 是否显示操作成功的提示 | boolean? | get 请求 false,其他 true |
| url | 请求的 url 地址 | string | - |
| method | 请求的 method,可以通过扩展方法比如，post 不需要提供该参数 | string? 'post'、'get'、'put','delete','patch' | - |
| [更多配置](https://github.com/axios/axios#request-config) |  |  | - |
