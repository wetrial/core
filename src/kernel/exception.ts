/**
 * 未登录异常
 */
export class UnAuthorizedException extends Error {}

/**
 * 后台抛出的异常信息
 */
export class UserFriendlyException extends Error {
  validationErrors?: string;
  constructor(name: string, message: string, stack?: string, validationErrors?: string) {
    super();
    this.name = name;
    this.message = message;
    this.stack = stack;
    this.validationErrors = validationErrors;
  }
}
