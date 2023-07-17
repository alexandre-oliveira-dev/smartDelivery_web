import { AES } from 'crypto-js';

interface Props {
  text: string;
}

class EncryptString {
  encryptString({ text }: Props) {
    const res = AES.encrypt(text, '').toString();
    return res;
  }
  descryptString({ text }: Props) {
    const res = AES.decrypt(text, '').toString(CryptoJS.enc.Utf8);
    return res;
  }
}

export { EncryptString };
