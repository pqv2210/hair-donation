import { TextStyle, TextProps as TextProperties } from "react-native"
import { TextPresets } from "./text.presets"

export const fonts = {
  huge: "OpenSansExtraBold",
  bold: "OpenSansBold",
  boldItalic: "OpenSansBoldItalic",
  regular: "OpenSansRegular",
  regularSemi: "OpenSansSemiBold",
  thin: "OpenSansLight",
  italic: "OpenSansItalic",
}

export type FontsTypes = keyof typeof fonts

export interface TextProps extends TextProperties {
  children?: React.ReactNode
  tx?: string
  txOptions?: any
  text?: any
  style?: TextStyle | TextStyle[]
  preset?: TextPresets
  font?: FontsTypes
  size?: number
  color?: string
}
