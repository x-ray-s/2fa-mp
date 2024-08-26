import { searchParams } from './decode'

interface OtpParams {
  type: string
  label: string
  issuer: string
  secret: string
  algorithm?: string
  digits?: number
  period?: number
}

/**
 * 解析OTP URI
 * @param uri
 * @example otpauth://totp/otplib-website:otplib-demo-user?secret=6BPYHH4FOYN2WUTJ&period=30&digits=6&algorithm=SHA1&issuer=otplib-website
 * @returns {OtpParams | null}
 */
export function parseOtpUri(uri: string): OtpParams | null {
  try {
    const [protocol, rest] = uri.split('://')
    const [type, labelAndParams] = rest.split('/', 2)

    if (protocol !== 'otpauth') {
      throw new Error('Invalid OTP URI protocol')
    }

    if (type !== 'totp' && type !== 'hotp') {
      throw new Error('Unsupported OTP type')
    }

    const [label, paramsString] = labelAndParams.split('?')
    const decodedLabel = decodeURIComponent(label)

    const params = new Map(Object.entries(searchParams(paramsString)))

    let issuer = params.get('issuer') || ''
    let account = decodedLabel

    // If label contains issuer, extract it
    if (decodedLabel.includes(':')) {
      [issuer, account] = decodedLabel.split(':')
    }

    // If issuer is not in params, use the one from label
    if (!params.get('issuer') && issuer) {
      params.set('issuer', issuer)
    }

    return {
      type,
      label: account.trim(),
      issuer: params.get('issuer') || '',
      secret: params.get('secret') || '',
      algorithm: params.get('algorithm') || undefined,
      digits: params.get('digits') ? Number.parseInt(params.get('digits')!) : undefined,
      period: params.get('period') ? Number.parseInt(params.get('period')!) : undefined,
    }
  }
  catch (error) {
    console.error('Error parsing OTP URI:', error)
    return null
  }
}
