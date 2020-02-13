import { urlToList, isPromise, isUrl, getQuery, isBrowser } from './utils';

describe('util', () => {
  describe('urlToList', () => {
    it('empty', () => {
      expect(urlToList()).toEqual(['/']);
    });

    it('url', () => {
      expect(urlToList('/userinfo/211/id')).toEqual([
        '/userinfo',
        '/userinfo/211',
        '/userinfo/211/id',
      ]);
    });
  });

  describe('isPromise', () => {
    it('number is not promise', () => {
      expect(isPromise(1)).toBe(false);
    });

    it('string is not promise', () => {
      expect(isPromise('1')).toBe(false);
    });

    it('boolean is not promise', () => {
      expect(isPromise(true)).toBe(false);
    });

    it('new Promise() is promise', () => {
      expect(isPromise(new Promise(resolve => resolve(1)))).toEqual(true);
    });
  });

  describe('isUrl', () => {
    it('empty', () => {
      expect(isUrl('')).toBe(false);
    });

    it('https', () => {
      expect(isUrl('https://blog.xxgtalk.cn')).toBe(true);
    });

    it('http', () => {
      expect(isUrl('http://blog.xxgtalk.cn')).toBe(true);
    });

    it('related path', () => {
      expect(isUrl('blog.xxgtalk.cn')).toBe(false);
    });
  });

  describe('getQuery', () => {
    it('empty', () => {
      expect(getQuery()).toEqual({});
    });

    it('one', () => {
      expect(getQuery('id=1')).toEqual({ id: '1' });
    });

    it('two arguments', () => {
      expect(getQuery('id=1&name=xxg')).toEqual({ id: '1', name: 'xxg' });
    });
  });

  describe('isBrowser', () => {
    it('empty', () => {
      expect(isBrowser()).toBe(true);
    });
  });
});
