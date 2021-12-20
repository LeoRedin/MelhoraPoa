import React, { FC } from "react"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

export const withModalProvider = (Component: FC) => () => {
  return (
    <BottomSheetModalProvider>
      <Component />
    </BottomSheetModalProvider>
  )
}
