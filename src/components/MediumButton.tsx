import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface MediumButtonTypes extends TouchableOpacityProps {
  bgHexColor: string
  title: string
}

const MediumButton = ({
  bgHexColor,
  title,
  ...touchableOpacityProps
}: MediumButtonTypes) => {
  return (
    <TouchableOpacity {...touchableOpacityProps}>
      <Text
        style={{
          fontFamily: 'LilitaOne_400Regular',
          color: 'white',
          paddingVertical: 10,
          paddingHorizontal: 25,
          fontSize: 20,
          textAlign: 'center',
          backgroundColor: bgHexColor,
        }}
        className='rounded-xl my-2 shadow'
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default MediumButton
