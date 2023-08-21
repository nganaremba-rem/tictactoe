import { LilitaOne_400Regular } from '@expo-google-fonts/lilita-one'
import { Roboto_500Medium, useFonts } from '@expo-google-fonts/roboto'
import * as SplashScreen from 'expo-splash-screen'
import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { Socket } from 'socket.io-client'
import { getSocket, initializeSocket } from '../utils/socketManager'

SplashScreen.preventAutoHideAsync()

// Types
type StoreContextTypes = {
  appIsReady: boolean
  setAppIsReady: React.Dispatch<React.SetStateAction<boolean>>
  getSocket: () => Socket
  initializeSocket: () => Socket
  closeSplashScreen: () => {}
}

interface StoreContextProviderProps {
  children: ReactNode
}

// Creating context
export const StoreContext = createContext<StoreContextTypes | undefined>(
  undefined
)

// Provider Function
const StoreContextProvider: React.FC<StoreContextProviderProps> = ({
  children,
}) => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false)

  //   using font
  const [fontsLoaded, fontError] = useFonts({
    Roboto_500Medium,
    LilitaOne_400Regular,
  })
  //   check if font is loaded
  useEffect(() => {
    console.log(fontsLoaded, fontError)

    if (!fontsLoaded && !fontError) return

    setAppIsReady(true)
  }, [fontsLoaded, fontError])

  const closeSplashScreen = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync()
  }, [appIsReady])

  const storeContextValues = useMemo(
    () => ({
      appIsReady,
      setAppIsReady,
      closeSplashScreen,
      initializeSocket,
      getSocket,
    }),
    [appIsReady]
  )

  if (!appIsReady) return null

  return (
    <StoreContext.Provider value={storeContextValues}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
