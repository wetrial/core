---
title: 辅助方法
order: 1
group:
  title: 辅助方法
  path: /utils
  order: 1
nav:
  title: 辅助方法
  path: /utils
  order: 1
---

# utils 辅助方法

提供常用辅助方法

## 使用方式

```tsx |pure
import { isPromise } from '@wetrial/core/utils';

const isP = isPromise(()=>{
    return new Promise(resolve=>{
        resolve(1)
    });
}));
```

## Methods

| 名称      | 描述                     | 类型                      |
| --------- | ------------------------ | ------------------------- |
| urlToList | 将路由转成 list 形式     | `(url?:string)=>string[]` |
| isPromise | 判断是否是 Promise 对象  | `(obj)=>boolean`          |
| isUrl     | 判断是否是一个合法的 url | `(path:string)=>boolean`  |
| getQuery  | 获取查询字符串           | `(query?:string)=>Object` |
| isBrowser | 判断是否是浏览器环境     | `()=>boolean`             |
