import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import useAuthContext from '../hooks/useAuthContext'
import Homepage from './Homepage'
import Login from './Login'
import Game from './Game'
import { Socket } from 'socket.io-client'

export type RootStackParamList = {
  Homepage: undefined
  Login: undefined
  Game: { roomId: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const Route = () => {
  const { isLoggedIn } = useAuthContext()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIn ? (
        <Stack.Group>
          <Stack.Screen name='Homepage' component={Homepage} />
          <Stack.Screen
            options={{
              animation: 'slide_from_bottom',
            }}
            name='Game'
            component={Game}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name='Login' component={Login} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

export default Route
