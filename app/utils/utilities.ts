import { TxKeyPath } from "../i18n"
import { Platform } from "react-native"
import i18n from "i18n-js"

/**
 * Check device OS is Android or iOS.
 */
export const isIOS = Platform.OS === "ios"
export const isAndroid = Platform.OS === "android"

/**
 * @function translate text.
 * @param key The i18n key.
 * @return text
 */
export function translate(key: TxKeyPath, options?: i18n.TranslateOptions) {
  return key ? i18n.t(key, options) : null
}

/**
 * @function check string
 * @param string
 * @returns boolean
 */
export const checkStringIsEmpty = (string: string) => {
  if (string == null || string === "" || string === "null") {
    return true
  } else {
    return false
  }
}

/**
 * A sleep statement.
 * @param ms The number of milliseconds to wait.
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
