import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { CollapsibleScrollView, Screen, Text } from "../../components"
import { color } from "../../theme"
import { Screens } from "../../utils"
import { BottomTabNavigatorType } from "../../navigators/bottom-navigator"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

const WRAP_ITEM: ViewStyle = {
  alignItems: "center",
  backgroundColor: "#D3D3D3",
  height: 40,
  justifyContent: "center",
  margin: 16,
}

export const HomeScreen: FC<StackScreenProps<BottomTabNavigatorType, Screens.home>> = observer(
  function HomeScreen() {
    const renderContent = () => {
      const data = Array.from({ length: 30 })
      return (
        <>
          {data.map((_, i) => (
            <View key={i} style={WRAP_ITEM}>
              <Text>{i}</Text>
            </View>
          ))}
        </>
      )
    }

    return (
      <Screen style={ROOT} preset="fixed">
        <CollapsibleScrollView
          title="Title Demo"
          renderContent={renderContent()}
          uri="https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg?h=f54c7448&itok=ZhplzyJ9"
        />
      </Screen>
    )
  },
)
