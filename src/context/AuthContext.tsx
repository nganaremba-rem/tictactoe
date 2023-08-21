import { GoogleSignin } from '@react-native-google-signin/google-signin'
import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Socket } from 'socket.io-client'
import useSecureStore from '../hooks/useSecureStore'
import useStoreContext from '../hooks/useStoreContext'

export const AuthContext = createContext<{
  isLoggedIn: boolean
  userInfo: null | {
    user: {
      photo: string
      name: string
      email: string
    }
  }
  login: (userInfo: string) => void
  logout: () => void
}>({ isLoggedIn: false, userInfo: null, login: () => {}, logout: () => {} })

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const { getItemAsync, deleteItemAsync, setItemAsync } = useSecureStore()
  const storeContext = useStoreContext()

  if (!storeContext) return null
  const { getSocket } = storeContext

  useEffect(() => {
    ;(async () => {
      const user = await getItemAsync('userInfo')
      if (user) {
        setUserInfo(JSON.parse(user))
        setIsLoggedIn(true)
      }
    })()
  }, [])

  async function logout() {
    const socket = getSocket()
    socket.disconnect()
    await GoogleSignin.signOut()
    await deleteItemAsync('userInfo')
    setUserInfo(null)
    setIsLoggedIn(false)
  }

  async function login(userInfo: string) {
    setItemAsync('userInfo', userInfo)
    setUserInfo(JSON.parse(userInfo))
    setIsLoggedIn(true)
  }

  const contextValues = useMemo(
    () => ({ isLoggedIn, userInfo, login, logout }),
    [userInfo, isLoggedIn]
  )

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
