import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { CollapsibleScrollView } from "./collapsible-scroll-view"

storiesOf("CollapsibleScrollView", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CollapsibleScrollView style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
