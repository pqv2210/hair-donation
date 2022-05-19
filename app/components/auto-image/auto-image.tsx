import React, { useLayoutEffect, useState } from "react"
import {
  Image as RNImage,
  ImageProps as DefaultImageProps,
  ImageURISource,
  Platform,
} from "react-native"

type ImageProps = DefaultImageProps & {
  source: ImageURISource
}

export function AutoImage(props: ImageProps) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    let mounted = true

    if (props.source?.uri) {
      RNImage.getSize(props.source.uri as any, (width, height) => {
        if (mounted) setImageSize({ width, height })
      })
    } else if (Platform.OS === "web") {
      RNImage.getSize(props.source as any, (width, height) => {
        if (mounted) setImageSize({ width, height })
      })
    } else {
      const { width, height } = RNImage.resolveAssetSource(props.source)
      setImageSize({ width, height })
    }

    return () => {
      mounted = false
    }
  }, [props.source])

  return <RNImage {...props} style={[imageSize, props.style]} />
}
