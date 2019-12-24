import axios, { AxiosRequestConfig } from 'axios';

import { omit, assign } from 'lodash';
import { message } from 'antd';
import { getToken } from './store';
import { UnAuthorizedException, UserFriendlyException } from './exception';

export interface IRequestOption extends AxiosRequestConfig {
  showTip?: boolean; // 操作成功是否提示
  url: string; // 请求的url
  method?: 'post' | 'get' | 'put' | 'delete' | 'patch';
}

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 通用请求拦截器
 */
const commonRequestInterceptor = [
  (config: any) => {
    assign(config.headers, {
      Authorization: `Bearer ${getToken()}`,
    });
    return config;
  },
];

/**
 * 通用响应拦截，拦截异常信息(非200-302之间的状态码)、未授权等
 */
const commonResponseInterceptor = [
  (rep: any): any => {
    const { config } = rep;
    // eslint-disable-next-line dot-notation
    if (config['showTip']) {
      message.success('操作成功', 2);
    }
    const {
      data = {
        result: null,
      },
    } = rep;
    return data['result'];
  },
  ({ response }) => {
    const { error, unAuthorizedRequest } = response.data;
    let exception;
    if (unAuthorizedRequest) {
      exception = new UnAuthorizedException(error.message);
    } else if (error) {
      exception = new UserFriendlyException(
        error.code,
        error.message,
        error.details,
        error.validationErrors,
      );
    } else {
      exception = new Error(response.statusText);
    }
    return Promise.reject(exception);
  },
];

export async function request<TResult = any>(opt: IRequestOption) {
  const result = await instance.request<TResult>(opt);
  return (result as unknown) as TResult;
}

export async function get<TResult = any>(opt: IRequestOption | string) {
  let options: IRequestOption;
  if (typeof opt === 'string') {
    options = {
      url: opt as string,
    };
  } else {
    options = opt;
  }
  return await request<TResult>({
    ...omit(options, 'data'),
    method: 'get',
    params: { timespan: new Date().getTime(), ...options.data },
    showTip: false,
  });
}

export async function post<TResult = any>(opt: IRequestOption) {
  return await request<TResult>({
    showTip: true,
    ...opt,
    method: 'post',
  });
}

export async function put<TResult = any>(opt: IRequestOption) {
  return await request<TResult>({
    showTip: true,
    ...opt,
    method: 'put',
  });
}

export async function patch<TResult = any>(opt: IRequestOption) {
  return await request<TResult>({
    showTip: true,
    ...opt,
    method: 'patch',
  });
}

export async function del<TResult = any>(opt: IRequestOption) {
  return await request<TResult>({
    showTip: true,
    ...opt,
    method: 'delete',
  });
}

export { instance, commonRequestInterceptor, commonResponseInterceptor };
