import React from 'react'
import { Text, TextProps, View } from 'react-native'

interface MyTextProps extends TextProps {
  children: string | undefined
  fontSize?: number
  color?: string
}

const MyText = ({ children, fontSize, color, ...textProps }: MyTextProps) => {
  return (
    <Text
      style={{
        fontFamily: 'LilitaOne_400Regular',
        color: color || 'white',
        fontSize: fontSize || 16,
      }}
      {...textProps}
    >
      {children}
    </Text>
  )
}

export default MyText
