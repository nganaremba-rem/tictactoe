import { MaterialIcons } from '@expo/vector-icons'
import * as Google from 'expo-auth-session/providers/google'
import * as ImagePicker from 'expo-image-picker'
import * as WebBrowser from 'expo-web-browser'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { getUser } from '../../api'
import useAuthContext from '../hooks/useAuthContext'
import useStoreContext from '../hooks/useStoreContext'

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import LongLogo from '../components/LongLogo'
import TextInputCustom from '../components/TextInputCustom'

// Configure for native google signin
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
})

// To close the web browser when auth completed
WebBrowser.maybeCompleteAuthSession()

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [keyboardOffset, setKeyboardOffset] = useState(0)
  const [image, setImage] = useState<string | undefined>(undefined)

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        setKeyboardOffset(event.endCoordinates.height)
      }
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOffset(0)
      }
    )

    // Clean up listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const { login } = useAuthContext()
  const storeContext = useStoreContext()

  if (!storeContext) return null

  const { closeSplashScreen } = storeContext
  // Google Sign in with native google play service
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()

      login(JSON.stringify(userInfo))
    } catch (error: any) {
      setError(JSON.stringify(error))
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.show('Sign in cancelled', ToastAndroid.SHORT)
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.show('Signin in Progress', ToastAndroid.SHORT)
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        ToastAndroid.show(
          'Google Play Service not available',
          ToastAndroid.LONG
        )
      } else {
        // some other error happened
        ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG)
      }
    }
  }

  // ! Sign in with google hook to redirect to web
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  })

  useEffect(() => {
    ;(async () => {
      if (response?.type === 'success') {
        const user = await getUser(response!.authentication!.accessToken)
        login(JSON.stringify(user))
      }
      if (response?.type === 'cancel' || response?.type === 'dismiss') {
        setIsLoading(false)
      }
      if (response?.type === 'error') {
        setIsError(true)
        setError('Error signing in to google')
      }
    })()

    return () => {
      setIsLoading(false)
    }
  }, [response])

  const onChangeUsername = (text: string) => {
    setUsername(text)
  }

  const onChangeEmail = (text: string) => {
    setEmail(text)
  }

  const handleLogin = useCallback(() => {
    if (username && email && image) {
      login(
        JSON.stringify({
          user: {
            name: username,
            email,
            photo: image,
          },
        })
      )
    } else {
      ToastAndroid.show(
        'Please select Image, Enter Username and Email also',
        ToastAndroid.LONG
      )
    }
  }, [username, email, image])

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={'#35258C'}
        barStyle={'light-content'}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className='bg-[#35258C] py-16 flex-1'
        >
          <TouchableWithoutFeedback
            onLayout={closeSplashScreen}
            onPress={Keyboard.dismiss}
          >
            <ScrollView
              className='pb-10'
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View
                style={{ marginTop: -keyboardOffset / 2 }}
                className='flex-1 items-center'
              >
                <LongLogo />
                <Pressable
                  style={{
                    width: 110,
                    height: 110,
                  }}
                  onPress={pickImage}
                  className='bg-indigo-600 mt-5 -mb-5 rounded-full justify-center items-center'
                >
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 100, height: 100 }}
                      className='rounded-full'
                    />
                  ) : (
                    <MaterialIcons
                      name='add-photo-alternate'
                      size={70}
                      color='white'
                    />
                  )}
                </Pressable>
                <View className='py-10'>
                  <TextInputCustom
                    color='#ffff'
                    label='Name'
                    onChangeText={onChangeUsername}
                    value={username}
                  />

                  <TextInputCustom
                    color='#ffff'
                    label='Email'
                    onChangeText={onChangeEmail}
                    value={email}
                    keyboardType='email-address'
                  />

                  <Pressable
                    android_ripple={{
                      color: 'rgb(255,25,255)',
                      foreground: false,
                      radius: 160,
                      borderless: false,
                    }}
                    onPress={handleLogin}
                    className='bg-[#BC2EBE] my-5 overflow-hidden px-10 py-5 rounded-xl'
                  >
                    <Text
                      style={{
                        fontFamily: 'LilitaOne_400Regular',
                        fontSize: 23,
                      }}
                      className='text-white text-center'
                    >
                      Login as a Guest
                    </Text>
                  </Pressable>
                </View>

                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={() => {
                    // setIsLoading(true)
                    // promptAsync()
                    signIn()
                  }}
                />
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  )
}

export default Login
