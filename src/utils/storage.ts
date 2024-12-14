const KEY = 'auth_codes'

const storage = {
  get(key = KEY) {
    return uni.getStorageSync(key)
  },
  set(data: any) {
    uni.setStorageSync(KEY, data)
  },
}

export { storage }
