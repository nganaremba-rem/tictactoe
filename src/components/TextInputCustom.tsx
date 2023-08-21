import React from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'

interface TextInputCustomProps extends TextInputProps {
  color: string
  label: string
}

const TextInputCustom = ({
  color,
  label,
  ...textInputProps
}: TextInputCustomProps) => {
  return (
    <View className='my-3'>
      <Text
        style={{
          fontFamily: 'LilitaOne_400Regular',
          color,
        }}
        className={`text-2xl`}
      >
        {label}
      </Text>
      <TextInput
        style={{
          fontFamily: 'LilitaOne_400Regular',
        }}
        className='border text-lg px-4 py-2 text-white border-1 border-slate-200 rounded  min-w-[330px] max-w-[330px] h-[55px]'
        {...textInputProps}
      />
    </View>
  )
}

export default TextInputCustom
