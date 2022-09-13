import { TxKeyPath } from "../i18n"
import { Platform } from "react-native"
import i18n from "i18n-js"
import DeviceInfo from "react-native-device-info"

/**
 * Screen option(s): hide screen header.
 */
export const SCREEN_OPTIONS = {
  headerShown: false,
  gestureEnabled: true,
}

/**
 * Check device OS is Android or iOS.
 */
export const isIOS = Platform.OS === "ios"
export const isAndroid = Platform.OS === "android"

/**
 * @function
 * @return true / false
 * @method check if iPhone X to iPhone 13
 */
export const isIPhoneX = () => {
  const isTrue = false
  if (!isIOS) {
    return isTrue
  }
  const name = DeviceInfo.getModel()
  const list = ["iPhone 5", "iPhone 6", "iPhone 7", "iPhone 8", "iPhone SE"]
  if (!list.some((item) => name.includes(item))) {
    return true
  }
  return isTrue
}

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
