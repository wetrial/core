import { every, get as depGet, template, templateSettings } from 'lodash';
import { get } from './request';

templateSettings.interpolate = /{{([\s\S]+?)}}/g;

const messages = {
  'validation.require': '不能为空',
  'validation.integer': '必须为整数',
  'validation.bool': '只能是和否',
  'validation.float': '只能为数字',
  'validation.email': '邮箱格式不正确',
  'validation.stringMax': '不能超过[{max}]个字符',
  'validation.max': '值不能大于{{max}}',
  'validation.stringMin': '最少{{min}}个字符',
  'validation.min': '值不能小于{{min}}',
  'validation.stringRange': '请输入{{min}}-{{max}}个字符',
  'validation.range': '只能输入{{min}}-{{max}}之间的数值',
  'validation.regex': '输入的值不符合规则',
  'validation.completx-sample': '输入不完整',
  'validation.remote': '检索该值失败',
};

/**
 * 必填校验
 */
export const required = {
  required: true,
  message: messages['validation.require'],
};

/**
 * 整数校验
 */
export const integer = {
  type: 'integer',
  message: messages['validation.integer'],
};

/**
 * bool值校验
 */
export const bool = {
  type: 'bool',
  message: messages['validation.bool'],
};

/**
 * float值校验
 */
export const float = {
  type: 'float',
  message: messages['validation.float'],
};

/**
 * url值校验
 */
export const url = {
  type: 'url',
  message: messages['validation.url'],
};
/**
 * email值校验
 */
export const email = {
  type: 'email',
  message: messages['validation.email'],
};

/**
 * 复杂类型的为空校验
 * @param {array<string>} checkProps 要校验的属性，支持aa.bb这种层级
 * @example getComplexRequire('from','to')
 */
export const getComplexRequire = (...checkProps: string[]): object => {
  return {
    // FormItem上的必填标志是通过required属性来增加的
    required: true,
    validator: (_, value, callback) => {
      if (value) {
        const isValid = every(checkProps, prop => {
          const v = depGet(value, prop);
          const type = typeof v;
          if (type === 'number') {
            return true;
          }
          return !!v;
        });
        if (isValid) {
          callback();
        }
      }
      callback(messages['validation.require']);
    },
  };
};

function hasValue(value, key) {
  const v = depGet(value, key);
  const type = typeof v;
  if (type === 'number') {
    return true;
  }
  return !!v;
}

/**
 * 复杂类型的一致性校验(要么都必填、要么都空)
 * @param {array<string>} checkProps 要校验的属性，支持aa.bb这种层级
 * @example getComplexSame('from','to')
 */
export const getComplexSame = (...checkProps: string[]): object => {
  return {
    validator: (rule, value, callback) => {
      if (value && checkProps.length > 1) {
        let isValid = true;
        // 检测第一项是否有值
        const firstHasValue = hasValue(value, checkProps[0]);
        checkProps.slice(1).forEach(item => {
          const curHasValue = hasValue(value, item);
          if (curHasValue !== firstHasValue) {
            isValid = false;
            return;
          }
        });
        if (!isValid) {
          callback(rule.message || messages['validation.completx-sample']);
        }
      }
      callback();
    },
  };
};

/**
 * 最大值规则校验
 * @param max 最大值
 */
export const getMax = (max: number, type: 'number' | 'string' = 'string'): object => {
  return {
    validator: (rule, value, callback) => {
      if (value === undefined || value === null) {
        callback();
        return;
      }
      const newRule = rule;
      newRule.max = max;
      newRule.type = type;
      if (value.length === 0) {
        callback();
      } else if (newRule.type === 'string') {
        if (value.length > newRule.max) {
          newRule.message =
            newRule.message || template(messages['validation.stringMax'])({ max: newRule.max });
          callback(new Error(newRule.message));
        }
      } else if (Number(value) > newRule.max) {
        newRule.message =
          newRule.message || template(messages['validation.max'])({ max: newRule.max });
        callback(new Error(newRule.message));
      }
      callback();
    },
  };
};

/**
 * 最小值规则校验
 * @param min 最小值校验
 * @param type 数值类型
 */
export const getMin = (min: number, type: 'number' | 'string' = 'string'): object => {
  return {
    validator: (cRule, value, callback) => {
      if (value === undefined || value === null) {
        callback();
        return;
      }
      const rule = cRule;
      rule.min = min;
      rule.type = type;
      if (value.length === 0) {
        callback();
      } else if (rule.type === 'string') {
        if (value.length < rule.min) {
          rule.message =
            rule.message || template(messages['validation.stringMin'])({ min: rule.min });
          callback(new Error(rule.message));
        }
      } else if (Number(value) < rule.min) {
        rule.message = rule.message || template(messages['validation.min'])({ min: rule.min });
        callback(new Error(rule.message));
      }
      callback();
    },
  };
};

/**
 * 范围校验
 * @param min 最小值
 * @param max 最大值
 * @param type 数值类型
 */
export const getRange = (
  min: number,
  max: number,
  type: 'number' | 'string' = 'string',
): object => {
  return {
    validator: (cRule, value, callback) => {
      if (value === undefined || value === null) {
        callback();
        return;
      }
      const rule = cRule;
      rule.min = min;
      rule.max = max;
      rule.type = type;
      if (value.length === 0) {
        callback();
      } else if (rule.type === 'string') {
        if (value.length < rule.min || value.length > rule.max) {
          rule.message =
            rule.message ||
            template(messages['validation.stringRange'])({
              min: rule.min,
              max: rule.max,
            });
          callback(new Error(rule.message));
        }
      } else if (Number(value) < rule.min || Number(value) > rule.max) {
        rule.message =
          rule.message ||
          template(messages['validation.range'])({
            min: rule.min,
            max: rule.max,
          });
        callback(new Error(rule.message));
      }
      callback();
    },
  };
};

/**
 * 正则校验
 * @param regex 正则表达式
 */
export const getRegex = (regex: string | RegExp): object => {
  return {
    validator: (cRule, value, callback) => {
      if (value === undefined || value === null) {
        callback();
        return;
      }
      const rule = cRule;
      rule.regex = regex;
      rule.message = rule.message || messages['validation.regex'];
      if (typeof rule.regex === 'string') {
        rule.regex = new RegExp(regex);
      }
      if (value && !rule.regex.test(value)) {
        callback(new Error(rule.message));
      }
      callback();
    },
  };
};

/**
 * 远程校验
 * @param {string} url 校验地址 需要返回true 通过 或者false 失败
 * @param {string} message 校验不通过的提示消息
 */
export const getRemoteRule = (
  // eslint-disable-next-line no-shadow
  url: string,
  message: string = messages['validation.remote'],
): object => {
  return {
    validator(cRule, value, callback) {
      const rule = cRule;
      rule.message = rule.message || message;
      if (!value) {
        callback();
        return;
      }
      get({
        url,
        data: {
          filter: value || '',
          key: new Date().getTime(),
        },
      }).then(rep => {
        if (rep) {
          callback();
        } else {
          callback(new Error(rule.message));
        }
      });
    },
  };
};
