import { newGuid } from './utils';
import { base64, debase64, encrypt, decrypt, encryptKey } from './crypto';

describe('utils >> crypto', () => {
  describe('base64 && debase64', () => {
    it('base64 string', () => {
      const basedContent = base64('you see what?');
      const deBasedContent = debase64(basedContent);
      expect(deBasedContent).toBe('you see what?');
    });

    // it('base64 object', () => {
    //   const basedContent = base64({ name: 'xxg', say: 'you see what?' });
    //   const deBasedContent = JSON.parse(debase64(basedContent));
    //   expect(deBasedContent.name).toBe('xxg');
    //   expect(deBasedContent.say).toBe('you see what?');
    // });
  });

  describe('encryptKey', () => {
    it('lengt is 172', () => {
      expect(encryptKey(newGuid()).length).toBe(172);
    });
  });

  describe('encrypt && decrypt', () => {
    it('encrypt string', () => {
      const cryptoKey = newGuid();
      const basedContent = encrypt('see you what?', cryptoKey);

      const deBasedContent = decrypt(basedContent, cryptoKey);
      expect(deBasedContent).toBe('see you what?');
    });

    it('encrypt object', () => {
      const cryptoKey = newGuid();
      const basedContent = encrypt({ name: 'xxg', say: 'see you what?' }, cryptoKey);
      const deBasedContent = JSON.parse(decrypt(basedContent, cryptoKey));
      expect(deBasedContent.name).toBe('xxg');
      expect(deBasedContent.say).toBe('see you what?');
    });
  });
});
