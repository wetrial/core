// 只导出高频使用的，其他一律通过import {} from '@wetrial/core/es/xxxx' 形式使用
import { configBase64Map, configRSAKey } from './crypto';

export { request, get, post, put, del, patch, head, options } from './request';

export { default as store } from './store';

export { base64, debase64, encrypt, decrypt, encryptKey } from './crypto';

export { IKeyValue, IWithFalse, CryptoType } from './types';

interface IWetrialCoreProps {
  /**
   * crypto中RSA加解密使用的Key
   */
  RSAKey?: string;
  /**
   * crypto中base64使用的map
   */
  Base64MAP?: string;
}

/**
 * 初始化wetrial core库的配置
 * @param props
 */
export function initWetrialCore(props: IWetrialCoreProps) {
  props.RSAKey && configRSAKey(props.RSAKey);
  props.Base64MAP && configBase64Map(props.Base64MAP);
}
