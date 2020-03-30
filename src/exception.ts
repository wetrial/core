export enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 4,
  REDIRECT = 9,
}

/**
 * 后台抛出的异常信息
 */
export class UserFriendlyException extends Error {
  showType?: ErrorShowType;
  code?: string;
  details?: any;
  validationErrors?: any;
}

/**
 * 未登录异常
 */
export class UnAuthorizedException extends UserFriendlyException {}
