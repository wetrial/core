---
title: 配置
order: 1
nav:
  title: 核心
  path: /list
group:
  title: 通用
  path: /common
legacy: /common/index
---

# 全局配置

提供 wetrial/core 包的全局配置

## 使用方式

```ts | pure
import { initWetrialCore } from '@wetrial/core';

// 在入口页面
initWetrialCore({
  RSAKey: '',
  Base64MAP: '',
  routeProfix: '',
  getGlobalHeader: () => {
    return {};
  },
});
```

### Props

| 参数            | 说明                        | 类型         | 默认值 |
| --------------- | --------------------------- | ------------ | ------ |
| RSAKey          | 加解密密钥                  | `string`     | -      |
| Base64MAP       | crypto 中 base64 使用的 map | `string`     | -      |
| routeProfix     | 动态追加的路由前缀          | `string`     | -      |
| getGlobalHeader | 自定义全局的 ajax 请求头    | `()=>Object` | -      |
