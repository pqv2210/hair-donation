import React, { ErrorInfo } from "react"
import { TextStyle, View, ViewStyle, ScrollView, ImageStyle } from "react-native"
import { color } from "../../theme"
import { Button, Icon, Text } from "../../components"

const CONTAINER: ViewStyle = {
  alignItems: "center",
  flex: 1,
  padding: 16,
  paddingVertical: 50,
  backgroundColor: color.background,
}

const ERROR_DETAILS_CONTAINER: ViewStyle = {
  width: "100%",
  maxHeight: "60%",
  backgroundColor: color.background,
  marginVertical: 15,
  paddingHorizontal: 10,
  paddingBottom: 15,
  borderRadius: 6,
}

const BTN_RESET: ViewStyle = {
  paddingHorizontal: 40,

  backgroundColor: color.primary,
}

const TITLE_ERROR: TextStyle = {
  color: color.error,
  fontWeight: "bold",
  paddingVertical: 15,
}

const FRIENDLY_SUBTITLE: TextStyle = {
  color: color.palette.black,
  fontWeight: "normal",
  paddingVertical: 15,
}

const CONTENT_ERROR: TextStyle = {
  color: color.error,
  fontWeight: "bold",
  paddingVertical: 15,
}

const ICON: ImageStyle = {
  marginTop: 30,
  width: 64,
  height: 64,
}

export interface ErrorComponentProps {
  error: Error
  errorInfo: ErrorInfo
  onReset(): void
}

export const ErrorComponent = (props: ErrorComponentProps) => {
  return (
    <View style={CONTAINER}>
      <Icon style={ICON} icon="bug" />
      <Text style={TITLE_ERROR} tx={"errorScreen.title"} />
      <Text style={FRIENDLY_SUBTITLE} tx={"errorScreen.friendlySubtitle"} />
      <View style={ERROR_DETAILS_CONTAINER}>
        <ScrollView>
          <Text selectable style={CONTENT_ERROR} text={`${props.error}`} />
        </ScrollView>
      </View>
      <Button style={BTN_RESET} onPress={props.onReset} tx="errorScreen.reset" />
    </View>
  )
}
