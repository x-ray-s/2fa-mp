const KEY = 'auth_codes'

const storage = {
  get() {
    return uni.getStorageSync(KEY)
  },
  set(data: any) {
    uni.setStorageSync(KEY, data)
  },
}

export { storage }
