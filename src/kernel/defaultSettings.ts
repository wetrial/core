export type ContentWidth = 'Fluid' | 'Fixed';

export interface ISettings {
  /**
   * theme for nav menu
   */
  navTheme: 'dark' | 'light' | undefined;
  /**
   * nav menu position: `sidemenu` or `topmenu`
   */
  layout: 'sidemenu' | 'topmenu';
  /**
   * layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
   */
  contentWidth: ContentWidth;
  /**
   * sticky header
   */
  fixedHeader: boolean;
  /**
   * auto hide header
   */
  autoHideHeader: boolean;
  /**
   * sticky siderbar
   */
  fixSiderbar: boolean;
  menu: { locale: boolean };
  pwa?: boolean;
  title: string;
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: string;
}

// eslint-disable-next-line import/no-mutable-exports
let defaultSettings: ISettings = {
  navTheme: 'light',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: true,
  autoHideHeader: true,
  fixSiderbar: true,
  menu: {
    locale: false,
  },
  pwa: false,
  title: 'Wetrial',
  iconfontUrl: '',
};

export function configDefaultSetting(setting: ISettings) {
  defaultSettings = setting;
}

export default defaultSettings;
