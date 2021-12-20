import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"

import { NavigatorParamList } from "../../navigators"
import { ActionSheet } from "../../components"

export const MapScreen: FC<StackScreenProps<NavigatorParamList, "map">> = observer(() => {
  return <ActionSheet />
})
