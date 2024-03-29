import { ViewStyle } from "react-native"
import { isNil } from "ramda"
import { color } from "../../theme"

export const offsets = {
  none: 0,
}

export type KeyboardOffsets = keyof typeof offsets

export const presets = {
  fixed: {
    outer: {
      backgroundColor: color.background,
      flex: 1,
      height: "100%",
    } as ViewStyle,
    inner: {
      justifyContent: "flex-start",
      alignItems: "stretch",
      height: "100%",
      width: "100%",
    } as ViewStyle,
  },
  scroll: {
    outer: {
      backgroundColor: color.background,
      flex: 1,
      height: "100%",
    } as ViewStyle,
    inner: { justifyContent: "flex-start", alignItems: "stretch" } as ViewStyle,
  },
}

export type ScreenPresets = keyof typeof presets

export function isNonScrolling(preset: ScreenPresets) {
  return isNil(preset) || !preset.length || isNil(presets[preset]) || preset === "fixed"
}
