import { TextStyle } from "react-native"
import { color } from "../../theme"
import { fonts } from "./text.props"

const BASE: TextStyle = {
  color: color.text,
  fontFamily: fonts.regular,
  fontSize: 14,
}

export const presets = {
  default: BASE,
  header: { ...BASE, fontSize: 20 } as TextStyle,
}

export type TextPresets = keyof typeof presets
