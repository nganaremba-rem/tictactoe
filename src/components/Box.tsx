import { View, Text, TouchableOpacity } from 'react-native'
import React, { Dispatch } from 'react'
import O from './O'
import X from './X'
import type { BoxTypes } from '../screens/types/GamePageTypes'

type BoxElementTypes = {
  idx: number
  isBoardDisabled: boolean
  box: BoxTypes
  backgroundColor: string
  isWiningIndex: boolean
  drawOnBoard: (index: number) => void
}

export default function Box({
  idx,
  isBoardDisabled,
  box,
  backgroundColor,
  isWiningIndex,
  drawOnBoard,
}: BoxElementTypes) {
  return (
    <TouchableOpacity
      key={idx}
      onPress={() => {
        if (!isBoardDisabled) drawOnBoard(box.index)
      }}
      style={{
        backgroundColor,
      }}
      className='min-w-[28%] min-h-[115px] m-2 rounded-3xl justify-center items-center'
    >
      {box.value === 'O' ? (
        <O winIdx={isWiningIndex} fontSize={80} />
      ) : (
        box.value && <X winIdx={isWiningIndex} fontSize={80} />
      )}
    </TouchableOpacity>
  )
}
