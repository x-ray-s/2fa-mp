import { googleauth } from './buf'
import { decode } from './decode'

interface OtpData {
  secret: string
  name: string
  issuer: string
}

export function convertOtpToMigrationData(otpList: OtpData[]): Uint8Array {
  const otpParameters = otpList.map(otp => ({
    secret: otp.secret,
    name: otp.name,
    issuer: otp.issuer,
    algorithm: googleauth.MigrationPayload.Algorithm.ALGO_SHA1,
    digits: 1,
    type: googleauth.MigrationPayload.OtpType.OTP_TOTP,
  }))
  const payload = new googleauth.MigrationPayload({
    otpParameters,
    version: 0,
    batchSize: 0,
    batchIndex: 0,
    batchId: 0,
  })

  return googleauth.MigrationPayload.encode(payload).finish()
}

const data = 'otpauth-migration://offline?data=ChgKCuMrScoLTidfCBYSBHRlc3QgASgBMAIQARgBIAAopI6DmPj%2F%2F%2F%2F%2FAQ%3D%3D'

const decoded = decode(data)

console.log(decoded)
const params = convertOtpToMigrationData(decoded)
console.log(uni.arrayBufferToBase64(params))

console.log(decode(`otpauth-migration://offline?data=${encodeURIComponent(uni.arrayBufferToBase64(params))}`))

function backup() {

}

export { backup }
