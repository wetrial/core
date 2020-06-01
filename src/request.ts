import axios, { AxiosRequestConfig, Method, AxiosResponse } from 'axios';
import { omit } from 'lodash';
import { message } from 'antd';
import { getToken } from './authority';
// import { UnAuthorizedException, UserFriendlyException, ErrorShowType } from './exception';
import { newGuid } from './utils';
import { encrypt, decrypt, encryptKey } from './crypto';
import { CryptoType } from './core';

export interface IRequestOption extends AxiosRequestConfig {
  /**
   * 操作成功是否提示
   */
  successTip?: boolean;
  /**
   * 是否跳过错误处理(主要为后端异常&success为false的时候是否自动弹错误信息)
   */
  skipErrorHandler?: boolean;
  /**
   * 请求方式
   */
  method?: Method;
  /**
   * 加密传输方式
   */
  crypto?: CryptoType;
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
 * 修改axios实例
 * @param config 配置
 */
export const configInstance = (config: AxiosRequestConfig) => {
  instance = axios.create(config);
};

/**
 * 通用请求拦截器
 */
const commonRequestInterceptor = [
  (option: any) => {
    const config: IRequestOption = option as IRequestOption;
    const token = getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${getToken()}`,
      };
    }
    if (config.crypto) {
      config['cryptoKey'] = newGuid();
      if (config.crypto === CryptoType.In || config.crypto === CryptoType.Both) {
        config.data = {
          body: encrypt(config.data, config['cryptoKey']),
        };
      }
      config.headers = {
        ...config.headers,
        Triple_DES_Key: encryptKey(config['cryptoKey']),
      };
    }
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
    if (requestConfig.responseType && requestConfig.responseType.toLowerCase() === 'arraybuffer') {
      return Promise.resolve(data);
    } else {
      if (requestConfig.successTip) {
        message.success('操作成功', 2);
      }

      if (requestConfig.crypto === CryptoType.Out || requestConfig.crypto === CryptoType.Both) {
        if (typeof data === 'string') {
          const decryptData = decrypt(data, config['cryptoKey']);
          return Promise.resolve(JSON.parse(decryptData));
        }
      }
      return Promise.resolve(data);
    }
  },
  ({ response }: { response: AxiosResponse }) => {
    return Promise.reject(response);
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

export async function post<TResult = any>(url: string, opt?: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'post',
  });
}

export async function put<TResult = any>(url: string, opt?: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'put',
  });
}

export async function patch<TResult = any>(url: string, opt?: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'patch',
  });
}

export async function del<TResult = any>(url: string, opt?: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'delete',
  });
}

export async function head<TResult = any>(url: string, opt?: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'HEAD',
  });
}

export async function options<TResult = any>(url: string, opt?: IRequestOption) {
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
