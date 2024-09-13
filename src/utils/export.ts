import { googleauth } from './buf'
import { decode } from './decode'

function getRandom(min: number, max: number) {
  const diff = max - min
  return Math.round(Math.random() * diff) + min
}

export function convertOtpToMigrationData(otpList: AuthCode[]): Uint8Array {
  const otpParameters = otpList.map(otp => ({
    secret: otp.secret,
    name: otp.name,
    issuer: otp.issuer,
    algorithm: googleauth.MigrationPayload.Algorithm.ALGO_SHA1,
    digits: 1,
    type: googleauth.MigrationPayload.OtpType.OTP_TOTP,
  }))
  const random = getRandom(10 ** 8, 10 ** 9 - 1)
  const payload = new googleauth.MigrationPayload({
    otpParameters,
    version: 1,
    batchSize: 1,
    batchIndex: 0,
    batchId: -random,
  })

  return googleauth.MigrationPayload.encode(payload).finish()
}

function _assert() {
  const data = 'otpauth-migration://offline?data=CkcKFBYYhE6vBbs6S0EF5ffzuahquZtpEiBEaXNjb3JkOnByaW5jZXNzd2FyNzIxQGdtYWlsLmNvbRoHRGlzY29yZCABKAEwAgpFChQm%2F0tLZGiioT0avtfb5DyCoAxY%2BRIfR29vZ2xlOnByaW5jZXNzd2FyNzIxQGdtYWlsLmNvbRoGR29vZ2xlIAEoATACEAEYASAAKOzZ3M78%2F%2F%2F%2F%2FwE%3D'
  const decoded = decode(data)
  const params = convertOtpToMigrationData(decoded)
  const url = `otpauth-migration://offline?data=${encodeURIComponent(uni.arrayBufferToBase64(params))}`
  console.log(data.length, url.length)
  console.log(url)
}

function createExportData(otpList: AuthCode[]) {
  const params = convertOtpToMigrationData(otpList)
  return `otpauth-migration://offline?data=${encodeURIComponent(uni.arrayBufferToBase64(params))}`
}

export { createExportData }
