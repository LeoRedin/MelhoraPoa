import React, { useMemo } from "react"
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native"
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { color } from "../../theme"

interface WeatherProps {
  animatedPosition: Animated.SharedValue<number>
  animatedIndex: Animated.SharedValue<number>
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

export const Actions = ({ animatedIndex, animatedPosition }: WeatherProps) => {
  // hooks
  const { bottom: bottomSafeArea } = useSafeAreaInsets()

  // styles
  const lockedYPosition = useMemo(() => SCREEN_HEIGHT - bottomSafeArea, [bottomSafeArea])

  const defaultSub = 48

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            animatedPosition.value < lockedYPosition
              ? animatedPosition.value - defaultSub
              : lockedYPosition - defaultSub,
        },
        {
          scale: interpolate(animatedIndex.value, [1, 1.25], [1, 0], Extrapolate.CLAMP),
        },
      ],
    }
  }, [lockedYPosition])

  const containerStyle = useMemo(() => [styles.container, containerAnimatedStyle], [
    containerAnimatedStyle,
  ])
  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity onPress={() => console.log("here")}>
        <Icon name="map-marker-plus" size={30} />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.primary,
    borderRadius: 50,
    marginTop: 0,
    padding: 8,
    position: "absolute",
    right: 12,
    top: 0,
  },
})
