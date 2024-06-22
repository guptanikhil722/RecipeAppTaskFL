import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

interface Props {
  onChangeText: (query: string) => void;
  placeholder: string;
  value: string
}
const InputField:React.FC<Props> = ({placeholder, onChangeText, value }) => {
  return (
    
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        inlineImageLeft='search_icon'
        placeholderTextColor={'#000000'}
        style={styles.textinput}
      />
      
  )
}

export default InputField

const styles = StyleSheet.create({
 textinput:{
  marginHorizontal: '5%',
  color:'#000000',
  width:'80%'
 }
})