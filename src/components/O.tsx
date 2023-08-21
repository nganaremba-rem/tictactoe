import { View, Text } from 'react-native'
import React from 'react'

const O = ({ fontSize, winIdx }: { fontSize: number; winIdx: boolean }) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: 'LilitaOne_400Regular',
          fontSize,
          color: winIdx ? 'white' : '#FFD033',
        }}
      >
        O
      </Text>
    </View>
  )
}

export default O
