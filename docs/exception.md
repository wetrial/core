---
title: 异常
order: 1
group:
  title: 异常
  path: /exception
  order: 5
nav:
  title: dva基类
  path: /exception
  order: 5
---

# exception 基础异常类

提供基础的异常基类

## 使用方式

```tsx |pure
import { UnAuthorizedException, UserFriendlyException } from '@wetrial/core/exception';

throw new UnAuthorizedException();
```

## Methods

| 名称                  | 描述                                           | 类型 |
| --------------------- | ---------------------------------------------- | ---- |
| UnAuthorizedException | 未登录抛出的异常基类，会对此异常类进行全局拦截 | -    |
| UserFriendlyException | 友好提示异常基类，会对此异常类进行全局拦截     | -    |
