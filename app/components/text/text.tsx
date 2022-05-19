import * as React from "react"
import { Text as ReactNativeText, TextStyle } from "react-native"
import { presets } from "./text.presets"
import { fonts, TextProps } from "./text.props"
import { mergeAll, flatten } from "ramda"
import { translate } from "../../utils"

export function Text(props: TextProps) {
  const {
    preset = "default",
    tx,
    txOptions,
    text,
    children,
    style: styleOverride,
    font,
    size,
    color,
    ...rest
  } = props

  const i18nText = tx && translate(tx, txOptions)

  let content = null

  if (i18nText != null) {
    content = i18nText
  }

  if (text != null) {
    content = text.toString()
  }

  if (children != null) {
    content = children
  }

  const style = mergeAll(
    flatten([
      presets[preset] || presets.default,
      styleOverride,
      color && { color: props.color },
      size && { fontSize: size },
    ]),
  )

  const customFont: TextStyle = { fontFamily: fonts[font] }

  return (
    <ReactNativeText {...rest} style={[style, font && customFont]}>
      {content}
    </ReactNativeText>
  )
}
