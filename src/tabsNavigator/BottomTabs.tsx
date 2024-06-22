import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ChatBotHome from '../screens/ChatBotHome';
import chatbot from '../assets/chatbot.png'
const Tab:any = createMaterialBottomTabNavigator();
const BottomTabs  = () : React.JSX.Element => {

  return (

    <NavigationContainer> 
     <Tab.Navigator initialRouteName="ChatBotHome"  activeColor="#f0edf6"
      inactiveColor="#3e2465" barStyle={{backgroundColor: 'tomato'}}>
      <Tab.Screen name="ChatBotHome" component={ChatBotHome} options={{
          tabBarLabel: 'Recipe Bot',
          tabBarIcon: ({ }) => (
            <Image source={chatbot}  />
          )}}/>
      
    </Tab.Navigator>
    </NavigationContainer>   

  )
}

export default BottomTabs

const styles = StyleSheet.create({})