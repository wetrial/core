---
title: 关于本站
order: 1
---



# 此仓库已废弃

**重要：** 此仓库后续不再维护，也不再接受更多的特性更新。`wetrial/core` 将会迁移至 `wetrial/wetrials` 仓库进行后续的维护，访问 https://wetrial.github.io/wetrials/core 了解更多。此变更不影响继续使用 `@wetrial/core` 这个 npm 包名安装使用此组件。

# @wetrial/core

wetrial 的核心类库

[![NPM version][image-1]][1] [![NPM downloads][image-2]][2]

## ✨ 特性

- 易学易用
- 使用 TypeScript 构建，提供完整的类型定义文件。
- 包含 model、request、store、等

## 📣 说明

## 📦 安装

```
npm i @wetrial/core --save
```

## 🔨 使用

```
import { get } from '@wetrial/core';
```

## 🖥 开发

```
$ git clone git@github.com:wetrial/core.git
$ cd core
$ npm install
$ npm start
```

打开浏览器访问 http://127.0.0.1:8001

## 说明

库中只会将高频使用的方法在 index 中导出，其他的需要全名引用，如：`import validationMessage from '@wetrial/core/es/validation'`

## 🤝 贡献

我们欢迎所有人参与共建，请参考[CONTRIBUTING.MD](https://github.com/wetrial/core/blob/master/CONTRIBUTING.MD)

## ✅ License

[MIT](https://github.com/wetrial/core/blob/master/LICENSE)

[1]: https://www.npmjs.com/package/@wetrial/core
[2]: https://npmjs.org/package/@wetrial/core
[image-1]: https://img.shields.io/npm/v/@wetrial/core.svg?style=flat
[image-2]: https://img.shields.io/npm/dm/@wetrial/core.svg?style=flat
