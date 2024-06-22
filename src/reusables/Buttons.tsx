import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'


interface Props {
    onPress: () => void;
    title: string
  }

const Buttons : React.FC<Props> = ({title, onPress}) => {
  return (
    <Button onPress={onPress} title={title} />
  )
}

export default Buttons

const styles = StyleSheet.create({})