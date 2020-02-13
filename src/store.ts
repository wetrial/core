import store from 'store';

const storeWithExp = {
  set: (key: string, val: any, exp?: number) => {
    store.set(key, { val, exp, time: new Date().getTime() });
  },
  get: (key: string) => {
    const info = store.get(key);
    if (!info) {
      return null;
    }
    if (new Date().getTime() - info.time > info.exp) {
      // 过期 移除
      storeWithExp.remove(key);
      return null;
    }
    return info.val;
  },
  remove: (key: string) => {
    store.remove(key);
  },
  clear: () => {
    store.clearAll();
  },
};

export default storeWithExp;
