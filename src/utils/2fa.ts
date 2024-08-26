import { Buffer } from '@otplib/preset-browser/buffer'

import { authenticator } from '@otplib/preset-browser'

(function (global) {
  global.Buffer = Buffer
})(this || window || globalThis)

export function counter() {
  return authenticator.timeUsed()
}
export function generate(secret?: string) {
  if (!secret) {
    secret = authenticator.generateSecret()
  }
  const token = authenticator.generate(secret)
  return {
    secret,
    token,
  }
}

export function verify(secret: string, token: string) {
  return authenticator.verify({ token, secret })
}
