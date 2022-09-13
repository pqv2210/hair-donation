import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { Screens } from "../../utils"
import { BottomTabNavigatorType } from "../../navigators/bottom-navigator"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

export const HomeScreen: FC<StackScreenProps<BottomTabNavigatorType, Screens.home>> = observer(
  function HomeScreen() {
    return (
      <Screen style={ROOT} preset="fixed">
        <Text text="home" />
      </Screen>
    )
  },
)
