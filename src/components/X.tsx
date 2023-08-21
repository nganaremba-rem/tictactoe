import { View, Text } from 'react-native'
import React from 'react'

const X = ({ fontSize, winIdx }: { fontSize: number; winIdx: boolean }) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: 'LilitaOne_400Regular',
          fontSize,
          color: winIdx ? 'white' : '#EB1750',
        }}
      >
        X
      </Text>
    </View>
  )
}

export default X
