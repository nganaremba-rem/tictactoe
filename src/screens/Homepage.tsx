import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import BigButton from '../components/BigButton'
import LongLogo from '../components/LongLogo'
import MediumButton from '../components/MediumButton'
import MyText from '../components/Text'
import TextInputCustom from '../components/TextInputCustom'
import useAuthContext from '../hooks/useAuthContext'
import useStoreContext from '../hooks/useStoreContext'
import { RootStackParamList } from './Route'

interface HomepagePropTypes {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Homepage'>
  route: RouteProp<RootStackParamList, 'Homepage'>
}

const Homepage: React.FC<HomepagePropTypes> = ({ navigation }) => {
  const { logout, userInfo } = useAuthContext()
  const storeContext = useStoreContext()
  const [roomIdToJoin, setRoomIdToJoin] = useState<string>('')

  if (!storeContext) return null
  const { closeSplashScreen, initializeSocket, getSocket } = storeContext

  useEffect(() => {
    initializeSocket()
    const socket = getSocket()
    socket.on('checkIfRoomExistResponse', ({ isSuccess }) => {
      console.log(isSuccess)

      if (isSuccess) {
        setIsJoinModalVisible(false)
        navigation.navigate('Game', {
          roomId: roomIdToJoin,
        })
        setRoomIdToJoin('')
      } else {
        ToastAndroid.show('No room found', ToastAndroid.LONG)
      }
    })
  }, [roomIdToJoin])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false)

  const getRandomFourDigit = useCallback(
    () => Math.floor(1000 + Math.random() * 8999),
    []
  )

  const joinRoom = useCallback(() => {
    const socket = getSocket()

    socket.emit('checkIfRoomExist', roomIdToJoin)
  }, [roomIdToJoin])

  const createHost = useCallback(() => {
    const randomFourDigit = getRandomFourDigit().toString()
    navigation.navigate('Game', {
      roomId: randomFourDigit,
    })
  }, [])

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={'#35248B'}
        barStyle={'light-content'}
      />
      <ScrollView
        className='pb-28 bg-[#35248B] flex-1 relative'
        onLayout={closeSplashScreen}
      >
        <TouchableOpacity
          onPress={() => setIsModalVisible(!isModalVisible)}
          className='absolute top-5 right-5'
        >
          <Image
            source={{
              uri:
                userInfo?.user?.photo ||
                'https://img.icons8.com/?size=512&id=xXjlE05o3dcg&format=png',
            }}
            width={40}
            height={40}
            borderRadius={50}
          />
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
          transparent
          animationType='fade'
          onRequestClose={() => setIsModalVisible(!isModalVisible)}
        >
          <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
            <View className='bg-[#00000057] flex-1 justify-center'>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View className='bg-[#6748c4] top-20 w-[70%] absolute right-8 rounded-lg p-4'>
                  <MyText fontSize={23}>{userInfo?.user?.name}</MyText>
                  <MyText color='#ccc'>{userInfo?.user?.email}</MyText>

                  <View className='mt-5'>
                    <MediumButton
                      title='Logout'
                      bgHexColor='#EB1750'
                      onPress={() => logout()}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          transparent
          animationType='slide'
          onRequestClose={() => setIsJoinModalVisible(false)}
          visible={isJoinModalVisible}
        >
          <TouchableWithoutFeedback
            className='flex-1'
            onPress={() => setIsJoinModalVisible(false)}
          >
            <View className='flex-1 bg-[#000002d1] justify-center items-center'>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View
                  style={{
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.5,
                    shadowRadius: 0.6,
                    elevation: 30, // Android elevation
                  }}
                  className='bg-[#462d8a] p-5 rounded-2xl'
                >
                  <TextInputCustom
                    keyboardType='number-pad'
                    label='Enter Room Code'
                    color='#ccc'
                    onChangeText={(text) => setRoomIdToJoin(text)}
                    value={roomIdToJoin}
                  />
                  <BigButton
                    onPress={joinRoom}
                    title='Join Room'
                    bgHexColor='#D72A8A'
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View className='p-10'>
          <LongLogo isVertical />
          <View className='py-28'>
            <BigButton
              onPress={createHost}
              bgHexColor='#AC31E6'
              title='Create Multiplayer'
            />
            <BigButton
              bgHexColor='#28B8AE'
              onPress={() => setIsJoinModalVisible(true)}
              title='Join Multiplayer'
            />
            {/* <BigButton bgHexColor='#28B8AE' title='Play Offline' /> */}
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default Homepage
