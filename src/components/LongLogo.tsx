import { useMemo } from 'react'
import { Text, View } from 'react-native'

type LongLogoTypes = {
  isVertical?: boolean
}

export default function LongLogo({ isVertical = false }: LongLogoTypes) {
  const dynamicClassName = useMemo(() => {
    return isVertical ? 'items-center' : 'items-center flex-row gap-5'
  }, [isVertical])

  const dynamicFontSize = useMemo(() => (isVertical ? 60 : 50), [isVertical])

  return (
    <View className={dynamicClassName}>
      <View>
        <Text
          style={{
            fontFamily: 'LilitaOne_400Regular',
            fontSize: dynamicFontSize,
          }}
        >
          <Text className='text-[#FFD033]'>T</Text>
          <Text className='text-[#EB1750]'>I</Text>
          <Text className='text-[#FFD033]'>C</Text>
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: 'LilitaOne_400Regular',
            fontSize: dynamicFontSize,
          }}
        >
          <Text className='text-[#EB1750]'>T</Text>
          <Text className='text-[#FFD033]'>A</Text>
          <Text className='text-[#EB1750]'>C</Text>
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: 'LilitaOne_400Regular',
            fontSize: dynamicFontSize,
          }}
        >
          <Text className='text-[#FFD033]'>T</Text>
          <Text className='text-[#EB1750]'>O</Text>
          <Text className='text-[#FFD033]'>E</Text>
        </Text>
      </View>
    </View>
  )
}
