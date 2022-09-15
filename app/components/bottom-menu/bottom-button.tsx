import * as React from "react"
import { TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import * as Animatable from "react-native-animatable"
import { Icon } from ".."
import { color as appColor, commonStyle, spacing } from "../../theme"
import { IconTypes } from "../icon/icons"
import { TxKeyPath } from "../../i18n"
import { translate } from "../../utils"
import { flatten, mergeAll } from "ramda"
import { fonts } from "../text/text.props"

const CONTAINER: ViewStyle = {
  ...commonStyle.CENTER,
  flex: 1,
  paddingVertical: spacing["small+"],
}

const WRAP_ICON: ViewStyle = {
  zIndex: 2,
  elevation: 2,
}

const TX: TextStyle = {
  fontFamily: fonts.regular,
  zIndex: 1,
}

export interface BottomButtonProps {
  icon: IconTypes
  tx: TxKeyPath
  onPress: () => void
  isRoute: boolean
}

export const BottomButton = observer(function BottomMenu(props: BottomButtonProps) {
  const { icon, tx, isRoute, onPress } = props
  const refIcon = React.useRef(null)
  const [fontSize, setFontSize] = React.useState<number>(11)

  React.useEffect(() => {
    if (isRoute) {
      setFontSize(1)
      refIcon?.current?.animate({
        0: { opacity: 1, scale: 1 },
        1: { opacity: 1, scale: 1.2 },
      })
    } else {
      setFontSize(11)
      refIcon?.current?.animate({
        0: { opacity: 1, scale: 1 },
        1: { opacity: 1, scale: 1 },
      })
    }
  }, [isRoute])

  const color = !isRoute ? appColor.black : appColor.primary

  const textStyle = () => mergeAll(flatten([TX, { fontSize, color }]))

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={CONTAINER}>
        <Animatable.View ref={refIcon} style={WRAP_ICON}>
          <Icon size={22} color={color} icon={icon} />
        </Animatable.View>
        {!isRoute && (
          <Animatable.Text transition="fontSize" style={textStyle()}>
            {translate(tx)}
          </Animatable.Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
})
