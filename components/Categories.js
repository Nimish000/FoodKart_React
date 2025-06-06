import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppUtil, dynamicFontSize } from '../Utils/AppUtils'
import { Colorss } from '../Colors/Colors'

export default function Categories({data,onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={{marginEnd:AppUtil.getWP(2),borderRadius:AppUtil.getWP(3),borderWidth:5,backgroundColor:Colorss.grey,padding:AppUtil.getWP(2),alignItems:'center'}}>
        <Text style={{fontSize:dynamicFontSize,color:Colorss.white}}>
            {data}
        </Text>
      
    </TouchableOpacity>
  )
}