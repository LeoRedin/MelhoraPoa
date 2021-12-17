import React, { FC } from "react"
import { ViewStyle, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import MapView from "react-native-maps"
import { NavigatorParamList } from "../../navigators"

const MAP: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
}

export const MapScreen: FC<StackScreenProps<NavigatorParamList, "map">> = observer(() => {
  return (
    <MapView
      style={MAP}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  )
})
