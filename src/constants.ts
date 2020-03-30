/* eslint-disable prefer-const */
/* eslint-disable import/no-mutable-exports */

import { IKeyValue } from './types';

// 默认页码
let PAGE_SIZE: number = 15;

// api前缀
let API_PREFIX: string = '/api/app/';

// 分页属性
let PAGE_PROPS = {
  defaultCurrent: 1,
  total: 1,
  pageSize: PAGE_SIZE,
  defaultPageSize: PAGE_SIZE,
  // showSizeChanger: true,
  hideOnSinglePage: true,
  // showQuickJumper:true,
  showTotal: (total, _, pageSize) => {
    return `每页${pageSize || PAGE_SIZE}条，共${total}条`;
  },
};

// 两列布局
let FORM_TWO_LAYOUT = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 6 },
    md: { span: 5 },
    lg: { span: 8 },
    xl: { span: 8 },
    xxl: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 18 },
    md: { span: 19 },
    lg: { span: 16 },
    xl: { span: 16 },
    xxl: { span: 20 },
  },
};

// label占1/4 元素框占3/4
let FORM_SINGLE_LAYOUT = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 6 },
    md: { span: 5 },
    lg: { span: 4 },
    xl: { span: 4 },
    xxl: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 18 },
    md: { span: 19 },
    lg: { span: 20 },
    xl: { span: 20 },
    xxl: { span: 22 },
  },
};

// col响应式
let COL_LAYOUT = {
  xs: 24, // <576px
  sm: 24, // ≥576px
  md: 24, // ≥768px
  lg: 12, // ≥992px
  xl: 12, // ≥1200px
  xxl: 12, // ≥1600px
};

// table 显示滚动条的宽度界限
let TABLE_SCROLL_WIDTH = 1300;

export function configApiPreFix(preFix: string) {
  API_PREFIX = preFix;
}

export function configPageSize(pageSize: number) {
  PAGE_SIZE = pageSize;
}

export function configTableScrollWidth(width: number) {
  TABLE_SCROLL_WIDTH = width;
}

export function configColLayout(layout: IKeyValue) {
  COL_LAYOUT = {
    ...COL_LAYOUT,
    ...layout,
  };
}

export function configFormSingleLayout(layout: IKeyValue) {
  FORM_SINGLE_LAYOUT = {
    ...FORM_SINGLE_LAYOUT,
    ...layout,
  };
}

export function configFormTwoLayout(layout: IKeyValue) {
  FORM_TWO_LAYOUT = {
    ...FORM_TWO_LAYOUT,
    ...layout,
  };
}

export function configPageProps(pageProps: IKeyValue) {
  PAGE_PROPS = {
    ...PAGE_PROPS,
    ...pageProps,
  };
}

export {
  API_PREFIX,
  PAGE_SIZE,
  PAGE_PROPS,
  FORM_TWO_LAYOUT,
  FORM_SINGLE_LAYOUT,
  COL_LAYOUT,
  TABLE_SCROLL_WIDTH,
};
