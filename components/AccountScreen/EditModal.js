import { View, Text, Modal } from 'react-native'
import React from 'react'
import { Colorss } from '../../Colors/Colors'

export default function EditModal({isEditable}) {
  return (
    <Modal animationType='slide' visible={isEditable}>
        <View style={{flex:1,backgroundColor:Colorss.grey}}>

        </View>
      
    </Modal>
  )
}