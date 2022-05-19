import { Dimensions } from "react-native"
import DeviceInfo from "react-native-device-info"

export const { width, height } = Dimensions.get("window")

export const isTablet = DeviceInfo.isTablet()
export const isNotch = DeviceInfo.hasNotch()
const guidelineBaseWidth = DeviceInfo.isTablet() ? 600 : 375
const guidelineBaseHeight = DeviceInfo.isTablet() ? 800 : 667

const scale = (size: number) => (width / guidelineBaseWidth) * size
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor

export { scale, verticalScale, moderateScale }
