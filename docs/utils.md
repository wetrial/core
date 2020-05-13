---
title: 辅助方法
order: 10
nav:
  title: 核心
  path: /list
group:
  title: 通用
  path: /common
legacy: /common/utils
---

# utils 辅助方法

提供常用辅助方法

## 使用方式

```tsx |pure
import { isPromise } from '@wetrial/core/es/utils';

const isP = isPromise(()=>{
    return new Promise(resolve=>{
        resolve(1)
    });
}));
```

## Methods

| 名称       | 描述                     | 类型                      |
| ---------- | ------------------------ | ------------------------- |
| urlToList  | 将路由转成 list 形式     | `(url?:string)=>string[]` |
| isPromise  | 判断是否是 Promise 对象  | `(obj)=>boolean`          |
| isUrl      | 判断是否是一个合法的 url | `(path:string)=>boolean`  |
| getQuery   | 获取查询字符串           | `(query?:string)=>Object` |
| isBrowser  | 判断是否是浏览器环境     | `()=>boolean`             |
| listToFlat | 将列表字典转换成对象     | `(any[])=>Object`         |
