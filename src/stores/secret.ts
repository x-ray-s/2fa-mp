import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSecretStore = defineStore('secret', () => {
  const secret = ref('')
  const newModal = ref(false)
  const locked = ref(true)
  const lockModal = ref(false)
  const expired = ref<boolean>(true)

  function setSecret(data: string) {
    secret.value = data
    uni.setStorageSync("SECRET", data)
  }
  
  const LOCKED = uni.getStorageSync('LOCKED')
  LOCKED && (locked.value = LOCKED)
  
  function isExpired () {
    const CREATED = uni.getStorageSync('CREATED')
    if (!CREATED) {
      return true
    }
    const now = Date.now()
    return CREATED + 5 * 1000 * 60 < now
  }
  
  function isLocked () {
    if (uni.getStorageSync("SECRET") === undefined) {
      return true
    }
    const LOCKED = uni.getStorageSync('LOCKED')
    if (LOCKED === false) {
      return false
    }
    return true
  }
  
  function setLocked (v: boolean) {
    locked.value = v
    uni.setStorageSync('LOCKED', v)
  }
  
  const init = () => {
    expired.value = isExpired()
    secret.value = uni.getStorageSync("SECRET")
    if (expired.value) {
     setLocked(true)
    } else {
      setLocked(isLocked())
    }
  }
  
  const unlock = () => {
    locked.value = false
    expired.value = false
    uni.setStorageSync('CREATED', Date.now())
    uni.setStorageSync('LOCKED', false)
  }
  
  const clean = () => {
    uni.removeStorageSync('CREATED')
    uni.removeStorageSync('LOCKED')
    uni.removeStorageSync('SECRET')
    locked.value = false
    expired.value = true
    secret.value = ''
    uni.removeStorageSync('PWD')
  }

  return { secret, setSecret, newModal, locked, lockModal, expired, init, unlock, clean }
})
