import { View, Text, Image } from 'react-native'
import React from 'react'
import X from './X'
import O from './O'
import { AntDesign } from '@expo/vector-icons'

type UserTypes = {
  id: string
  name: string
  photo: string | undefined
  isX: boolean
  userSocketId: string
  currentTurnSocketId: string
}

const userImage = require('../../assets/images/user.png')

function UserCard({
  id,
  isX,
  name,
  photo,
  userSocketId,
  currentTurnSocketId,
}: UserTypes) {
  return (
    <View
      key={id}
      style={{
        width: 170,
        height: 240,
        maxWidth: 170,
        maxHeight: 240,
      }}
      className={`${
        currentTurnSocketId === id ? 'bg-green-700' : 'bg-[#28175C]'
      } relative border-2 border-white space-y-3 items-center px-7 py-5 rounded-2xl`}
    >
      <View className='absolute left-2 top-2'>
        {id === userSocketId && (
          <AntDesign name='star' size={24} color='yellow' />
        )}
      </View>

      <Image
        source={{
          uri: photo || userImage,
        }}
        width={90}
        height={90}
        className='rounded-full'
      />
      <Text
        style={{
          fontFamily: 'LilitaOne_400Regular',
          fontSize: 20,
        }}
        numberOfLines={1}
        className='text-white whitespace-nowrap  overflow-hidden'
      >
        {name}
      </Text>
      <View>
        {isX ? (
          <X winIdx={false} fontSize={30} />
        ) : (
          <O winIdx={false} fontSize={30} />
        )}
      </View>
    </View>
  )
}

export default UserCard
