import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface BigButtonTypes extends TouchableOpacityProps {
  bgHexColor: string
  title: string
}

const BigButton = ({
  bgHexColor,
  title,
  ...touchableOpacityProps
}: BigButtonTypes) => {
  return (
    <TouchableOpacity {...touchableOpacityProps}>
      <Text
        style={{
          fontFamily: 'LilitaOne_400Regular',
          color: 'white',
          paddingVertical: 20,
          paddingHorizontal: 25,
          fontSize: 23,
          textAlign: 'center',
          backgroundColor: bgHexColor,
        }}
        className='rounded-full my-2 shadow'
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default BigButton
