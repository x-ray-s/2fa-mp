import CryptoJS from 'crypto-js'

const KEY = 'PWD'

export interface Password {
  name : string
  password : string
  tags : string[]
  id : string
}

/**
 * 加密
 * @param {string} str 需要加密的数据
 * @param {string} secret 密钥
 * @returns
 */
export function encrypt(str: string, secret: string) {
  const cryptoKey = CryptoJS.enc.Utf8.parse(secret);
  const cryptoOption = {
    iv: CryptoJS.enc.Utf8.parse(secret.substring(0, 16)),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };
  const encryptedStr = CryptoJS.AES.encrypt(str, cryptoKey, cryptoOption).toString();
  return encryptedStr;
}

/**
 * 解密
 * @param {string} str 需要解密的数据
 * @param {string} secret 密钥
 * @returns
 */
export function decrypt(str: string, secret: string) {
  const cryptoKey = CryptoJS.enc.Utf8.parse(secret);
  const cryptoOption = {
    iv: CryptoJS.enc.Utf8.parse(secret.substring(0, 16)),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };
  const decryptedStr = CryptoJS.AES.decrypt(str, cryptoKey, cryptoOption).toString(
    CryptoJS.enc.Utf8,
  );
  return decryptedStr;
}

const storage = {
  get() {
    return uni.getStorageSync(KEY)
  },
  pick(id : string) {
    return this.get().find((item : Password) => item.id === id);
  },
  remove(id : string) {
    const origin = this.get()
    uni.setStorageSync(KEY, origin.filter((item : Password) => item.id !== id))
  },
  add(password : Exclude<Password, 'id'>, secret : string) {
    const origin = this.get()
    const id = CryptoJS.MD5(password.name + password.password).toString()
    const key = CryptoJS.MD5(secret).toString()
    const encryptedPassword = encrypt(password.password, key)
    const newPassword = {
      ...password,
      password: encryptedPassword,
      id,
    }
    uni.setStorageSync(KEY, [...origin, newPassword])
  },
  patch(password : Password) {
    const origin = this.get()
    uni.setStorageSync(KEY, origin.map((item : Password) => {
      if (item.id === password.id) {
        return password
      }
      return item
    }))
  },
  uncrypted (pwd: string, secret: string) {
    const key = CryptoJS.MD5(secret).toString()
    return decrypt(pwd, key);
  }
}

export { storage }