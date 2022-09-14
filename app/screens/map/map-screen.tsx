import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { BottomTabNavigatorType } from "../../navigators"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { Screens } from "../../utils"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

export const MapScreen: FC<StackScreenProps<BottomTabNavigatorType, Screens.map>> = observer(function MapScreen() {
  // const { someStore, anotherStore } = useStores()
  // const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="fixed">
      <Text text="map" />
    </Screen>
  )
})
