import * as React from "react"
import { KeyboardAvoidingView, ScrollView, StatusBar, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { color } from "../../theme"
import { isIOS } from "../../utils"

const WIDTH: ViewStyle = { width: "100%" }

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle = {
    ...WIDTH,
    height: props.unsafe || !isIOS ? 0 : insets.top,
    backgroundColor: props.statusBarColor ?? color.background,
  }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <View style={insetStyle} />
      <StatusBar backgroundColor={color.background} barStyle={props.statusBar || "dark-content"} />
      <View style={[preset.inner, style]}>{props.children}</View>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle = {
    ...WIDTH,
    height: props.unsafe || !isIOS ? 0 : insets.top,
    backgroundColor: props.statusBarColor ?? color.background,
  }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <View style={insetStyle} />
      <StatusBar backgroundColor={color.background} barStyle={props.statusBar || "dark-content"} />
      <View style={[preset.outer, backgroundStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
        >
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
