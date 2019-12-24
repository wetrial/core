import { setToken, getToken, clearToken, setPermissions, getPermissions } from './store';

describe('store', () => {
  describe('setToken && getToken && clearToken', () => {
    it('without exp', () => {
      setToken('test');
      const token = getToken();
      expect(token).toEqual('test');
    });
  });

  describe('setToken with exp', () => {
    it('without exp', () => {
      setToken('test', 100);
      setTimeout(() => {
        const token = getToken();
        expect(token).toEqual(null);
      }, 101);
    });
  });

  describe('setToken with clearToken', () => {
    it('without exp', () => {
      setToken('test');
      clearToken();
      const token = getToken();
      expect(token).toEqual(null);
    });
  });

  describe('setPermissions && getPermissions', () => {
    it('without exp', () => {
      setPermissions(['admin', 'rolemanager']);
      expect(getPermissions()).toEqual(['admin', 'rolemanager']);
    });
  });
});
