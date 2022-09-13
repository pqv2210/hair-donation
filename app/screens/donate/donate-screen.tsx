import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../../navigators"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

export const DonateScreen: FC<StackScreenProps<AppStackParamList, "donate">> = observer(function DonateScreen() {
  // const { someStore, anotherStore } = useStores()
  // const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="fixed">
      <Text text="donate" />
    </Screen>
  )
})
