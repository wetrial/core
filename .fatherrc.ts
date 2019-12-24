import { IBundleOptions } from 'father-build';

const zhConfig = {
  dest: '.doc/zh-cn',
  base: '/zh-cn',
  files: './src/**/*_cn.{md,markdown,mdx}',
  themeConfig: {
    codemirrorTheme: 'docz-light',
    menus: [
      { title: '发布日志', link: 'https://github.com/wetrial/core/releases' },
      { title: 'Github', link: 'https://github.com/wetrial/core' },
    ],
  },
};

const enConfig = {
  dest: '.doc',
  base: '/',
  files: './src/**/*_en.{md,markdown,mdx}',
  themeConfig: {
    codemirrorTheme: 'docz-light',
    menus: [
      { title: 'Changelog', link: 'https://github.com/wetrial/core/releases' },
      { title: 'Github', link: 'https://github.com/wetrial/core' },
    ],
  },
};

const config = process.env.LAN === 'zh-CN' ? zhConfig : enConfig;

const options: IBundleOptions = {
  entry: 'src/index.ts',
  esm: 'babel',
  cjs: 'babel',
  umd: {
    name: 'wetrialHooks',
    globals: {
      react: 'React',
    },
  },
  disableTypeCheck: true,
  preCommit: {
    eslint: true,
    prettier: true,
  },
  doc: {
    title: '@wetrial/core',
    repository: 'https://github.com/wetrial/core',
    theme: 'docz-theme-umi-hooks',
    ignore: [
      'readme.md',
      'changelog.md',
      'readme_zh-CN.md',
      'contributing.md',
      'license.md',
      '__template__/*.mdx',
    ],
    ...config,
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};

export default options;
