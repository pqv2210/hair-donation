import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators"
import { color } from "../../theme"
import { Text, Screen } from "../../components"

const WRAP_TEXT: ViewStyle = {
  backgroundColor: color.error,
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(() => {
  return (
    <Screen preset="fixed">
      <View style={WRAP_TEXT}>
        <Text text="Hello world" />
      </View>
    </Screen>
  )
})
