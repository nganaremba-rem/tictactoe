import React from 'react'
import { View } from 'react-native'

export default function UserCardSkeleton() {
  return (
    <View className='animate-pulse'>
      <View
        style={{
          width: 170,
          height: 240,
          maxWidth: 170,
          maxHeight: 240,
        }}
        className='animate-pulse bg-[#523c96]  relative border-2 border-white space-y-3 items-center ml-5 mt-5 rounded-2xl'
      ></View>
    </View>
  )
}
