import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useCallback, useMemo} from 'react'
import InputField from './InputField'
import micIcon from '../assets/micIcon.png'
import cross from '../assets/cross.png'
import check from '../assets/check.png'
import { getScreenHeightWidht } from '../utils/helper';


const screen = getScreenHeightWidht()
interface Props {
    queryText: string;
    onQueryChange: (query: string) => void;
    onVoiceRecognitionPress: () => void;
    getRecipe: () => void;
  }
const ChatBotTextBar: React.FC<Props> = ({ queryText, onQueryChange, onVoiceRecognitionPress, getRecipe }) => {
  const [imageState, setImageState] = useState({});

  const handleQueryChange = (text: string) => {
    console.log('query in textfield>>', text)
    // setQuery(text);
    onQueryChange(text);
  };
  useEffect(()=>{
    if(queryText === ''){
      setImageState('')
    }else{
      setImageState(cross)
    }
    handleQueryChange(queryText)
  },[queryText])
  return (
    <View style={styles.searchBar}>
      <View style={{width:'90%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
      <InputField
        value={queryText}
        onChangeText={handleQueryChange}
        placeholder="Ask for a recipe"
      />
      {queryText!==''?
      <TouchableOpacity onPress={()=>{handleQueryChange('')}}>
        <Image source={imageState}></Image>
      </TouchableOpacity>
      :null}
      </View>
      <TouchableOpacity onPress={onVoiceRecognitionPress}>
      <Image source={micIcon}/>
      </TouchableOpacity>
      {/* <Buttons title="Speak" onPress={onVoiceRecognitionPress} /> */}
    </View>
  )
}

export default ChatBotTextBar

const styles = StyleSheet.create({
    searchBar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:'5%',
        paddingVertical:'2%',
        width: screen.width/1.2,
        borderColor: '#000814',
        borderWidth:2,
        borderRadius:15,
        top: '3%',
        // left:'10%',
        marginVertical:'3%',
        marginHorizontal:'5%'
        // margin: '3%'
    }
})