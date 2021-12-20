import * as React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import BottomSheet from "@gorhom/bottom-sheet"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useDerivedValue, useSharedValue } from "react-native-reanimated"
import { Actions } from ".."

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

export const ActionSheet = () => {
  const bottomSheetRef = React.useRef<BottomSheet>(null)
  const { bottom: bottomSafeArea } = useSafeAreaInsets()

  const minHeight = bottomSafeArea * 2
  const snapPoints = React.useMemo(() => [minHeight, "75%"], [bottomSafeArea])

  // animated
  const animatedBottomSheetIndex = useSharedValue<number>(0)
  const animatedBottomSheetPosition = useSharedValue<number>(SCREEN_HEIGHT)
  const animatedPOIDetailsIndex = useSharedValue<number>(0)
  const animatedPOIDetailsPosition = useSharedValue<number>(SCREEN_HEIGHT)

  const actionAnimatedindex = useDerivedValue(() =>
    animatedBottomSheetIndex.value > animatedPOIDetailsIndex.value
      ? animatedBottomSheetIndex.value
      : animatedPOIDetailsIndex.value,
  )
  const actionAnimatedPosition = useDerivedValue(() =>
    animatedBottomSheetPosition.value < animatedPOIDetailsPosition.value
      ? animatedBottomSheetPosition.value
      : animatedPOIDetailsPosition.value,
  )

  return (
    <>
      <Actions animatedIndex={actionAnimatedindex} animatedPosition={actionAnimatedPosition} />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        animatedIndex={animatedBottomSheetIndex}
        animatedPosition={animatedBottomSheetPosition}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
  },
})
