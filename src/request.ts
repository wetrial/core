import axios, { AxiosRequestConfig, Method, AxiosResponse } from 'axios';

import { omit, assign } from 'lodash';
import { message } from 'antd';
import { getToken } from './authority';
import { UnAuthorizedException, UserFriendlyException } from './exception';

export interface IRequestOption extends AxiosRequestConfig {
  successTip?: boolean; // 操作成功是否提示
  skipErrorHandler?: boolean; // 是否跳过错误处理(主要为后端异常&success为false的时候是否自动弹错误信息)
  method?: Method;
}

// eslint-disable-next-line
let instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 6000,
  timeoutErrorMessage: '请求超时，请重试!',
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
  (response: AxiosResponse): any => {
    const { data, config } = response;
    const requestConfig = config as IRequestOption;

    if (requestConfig.successTip) {
      message.success('操作成功', 2);
    }
    return Promise.resolve(data);
  },
  ({ response }: { response: AxiosResponse }) => {
    const { data, config, status } = response;
    const requestConfig = config as IRequestOption;
    if (requestConfig.skipErrorHandler) {
      return Promise.reject(data);
    }
    let exception;
    if (status === 401) {
      exception = data as UnAuthorizedException;
    } else if (status === 500) {
      exception = data as UserFriendlyException;
    } else {
      exception = data;
    }
    throw exception;
  },
];

export async function request<TResult = any>(opt: IRequestOption) {
  const result = await instance.request<TResult>(opt);
  return (result as unknown) as TResult;
}

export async function get<TResult = any>(url: string, opt?: IRequestOption) {
  return await request<TResult>({
    url,
    ...omit(opt, 'data'),
    method: 'get',
    params: { timespan: new Date().getTime(), ...opt?.data },
    successTip: false,
  });
}

export async function post<TResult = any>(url: string, opt: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'post',
  });
}

export async function put<TResult = any>(url: string, opt: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'put',
  });
}

export async function patch<TResult = any>(url: string, opt: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'patch',
  });
}

export async function del<TResult = any>(url: string, opt: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'delete',
  });
}

export async function head<TResult = any>(url: string, opt: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'HEAD',
  });
}

export async function options<TResult = any>(url: string, opt: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'OPTIONS',
  });
}

function addRequestInterceptor(
  onFulfilled?: (value: any) => any | Promise<any>,
  onRejected?: (error: any) => any,
) {
  return instance.interceptors.request.use(onFulfilled, onRejected);
}

function ejectRequestInterceptor(interceptorId: number) {
  return instance.interceptors.request.eject(interceptorId);
}

function addResponseInterceptor(
  onFulfilled?: (value: any) => any | Promise<any>,
  onRejected?: (error: any) => any,
) {
  return instance.interceptors.response.use(onFulfilled, onRejected);
}

function ejectResponseInterceptor(interceptorId: number) {
  return instance.interceptors.response.eject(interceptorId);
}

export {
  axios,
  instance,
  commonRequestInterceptor,
  commonResponseInterceptor,
  addRequestInterceptor,
  ejectRequestInterceptor,
  addResponseInterceptor,
  ejectResponseInterceptor,
};
