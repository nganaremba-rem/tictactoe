import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import AuthContextProvider from './src/context/AuthContext'
import StoreContextProvider from './src/context/StoreContext'
import Route from './src/screens/Route'

// Keep splash screen visible until font is loaded

export default function App() {
  return (
    <StoreContextProvider>
      <AuthContextProvider>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </AuthContextProvider>
    </StoreContextProvider>
  )
}
