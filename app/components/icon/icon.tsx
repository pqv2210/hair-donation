import * as React from "react"
import { View, ImageStyle, ViewStyle } from "react-native"
import { AutoImage as Image } from "../auto-image/auto-image"
import { icons, IconTypes } from "./icons"

const ROOT: ImageStyle = { resizeMode: "contain" }

export interface IconProps {
  style?: ImageStyle
  containerStyle?: ViewStyle
  icon?: IconTypes
  size?: number
  color?: string
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props

  return (
    <View style={containerStyle}>
      <Image style={[ROOT, styleOverride]} source={icons[icon]} />
    </View>
  )
}
