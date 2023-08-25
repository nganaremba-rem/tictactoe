import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Route'
import { RouteProp } from '@react-navigation/native'

export type GamePropTypes = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Game'>
  route: RouteProp<RootStackParamList, 'Game'>
}

export type BoxTypes = {
  index: number
  value: null | 'X' | 'O'
}

export type User = {
  name: string
  photo: string
  isX: boolean
  id: string
}
