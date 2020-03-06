---
title: dva基类
order: 1
group:
  title: dva基类
  path: /model
  order: 4
nav:
  title: dva基类
  path: /model
  order: 4
---

# model model 基础类

为 dva 中的 model 提供基类,基类中提供了通用的 reducers:update

## 使用方式

```tsx |pure
import extend from '@wetrial/core/model';

export interface IAccountModelState {
  currentUser?: any;
}

export default extend<IAccountModelState>({
  namespace: 'account',
  state: {
    currentUser: {},
  },
  effects: {
    *login({ payload }, { call }) {
      // TODO ...
      yield put({
        type: 'update',
        payload: {
          currentUser,
        },
      });
    },
  },
});
```
