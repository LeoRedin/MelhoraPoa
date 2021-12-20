import React, { useMemo } from "react"
import { Dimensions, StyleSheet, Text } from "react-native"
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface WeatherProps {
  animatedPosition: Animated.SharedValue<number>
  animatedIndex: Animated.SharedValue<number>
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

export const Actions = ({ animatedIndex, animatedPosition }: WeatherProps) => {
  console.log("🚀 ~ file: actions.tsx ~ line 14 ~ Actions ~ animatedPosition", animatedPosition)
  console.log("🚀 ~ file: actions.tsx ~ line 14 ~ Actions ~ animatedIndex", animatedIndex)
  // hooks
  const { bottom: bottomSafeArea } = useSafeAreaInsets()

  // styles
  const lockedYPosition = useMemo(() => SCREEN_HEIGHT - bottomSafeArea, [bottomSafeArea])
  const containerAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY:
            animatedPosition.value > lockedYPosition
              ? animatedPosition.value - 24
              : lockedYPosition - 24,
        },
        {
          scale: interpolate(animatedIndex.value, [1, 1.25], [1, 0], Extrapolate.CLAMP),
        },
      ],
    }),
    [lockedYPosition],
  )
  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: "white" }, containerAnimatedStyle],
    [containerAnimatedStyle],
  )
  return (
    <Animated.View style={containerStyle}>
      <Text style={styles.label}>☁️12°</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    marginTop: 0,
    padding: 2,
    position: "absolute",
    right: 12,
    top: 0,
  },
  label: {
    fontSize: 16,
    lineHeight: 16,
  },
})
