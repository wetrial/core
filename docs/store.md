---
title: store 本地存储
path: /store
order: 300
---

# store 本地存储

提供本地存储相关方法

## 使用方式

```tsx |pure
import store from '@wetrial/core/store';

store.set('', '');
```

## Methods

| 名称   | 描述                            | 类型                                     |
| ------ | ------------------------------- | ---------------------------------------- |
| set    | 键值对，存储到本地,可带过期时间 | `(key:string,val:any,exp?:number)=>void` |
| get    | 获取缓存对象                    | `(key:string)=>any`                      |
| remove | 移除指定缓存                    | `(key:string)=>void`                     |
| clear  | 清空所有缓存                    | `()=>void`                               |
