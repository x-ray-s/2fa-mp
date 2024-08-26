import base32 from './edbase32'
import { googleauth } from './buf'

function decodeProtobuf(payload: any) {
  const { MigrationPayload } = googleauth

  const message = MigrationPayload.decode(payload)

  return MigrationPayload.toObject(message, {
    longs: String,
    enums: String,
    bytes: String,
  })
}

function toBase32(base64String: string) {
  const raw = uni.base64ToArrayBuffer(base64String) as any
  return base32.encode(new Uint8Array(raw))
}

export function parseQuery(uri: string) {
  return uri.split('?')[1]
}
export function searchParams(query: string) {
  const toArray = query.split('&')
  return toArray.reduce((acc, cur) => {
    const [key, value] = cur.split('=')
    acc[key] = value
    return acc
  }, {} as Record<string, string>)
}

export function decode(uri: string) {
  const queryParams = parseQuery(uri)
  const { data } = searchParams(queryParams)
  if (data) {
    const buffer = uni.base64ToArrayBuffer(decodeURIComponent(data))

    const payload = decodeProtobuf(new Uint8Array(buffer))

    const accounts = payload.otpParameters.map((account: any) => {
      account.totpSecret = toBase32(account.secret)
      return account
    })

    return accounts
  }
}
