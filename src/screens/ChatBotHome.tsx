import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect, useMemo, useCallback} from 'react'
import ChatBotTextBar from '../reusables/ChatBotTextBar'
import InputField from '../reusables/InputField'
import RecipeListItem from '../reusables/RecipeListItem'
import RecipeList from '../reusables/ItemsList'
import { fetchRecipe, fetchRecipeIngredients } from '../services/fetchRecipesSearch'
import { showSnackbar } from '../utils/helper'
import useVoiceRecognition from '../services/useVoiceRecogination'
import { saveRecipe } from '../storage/storage'
interface Props {
  navigation: any;
}


const ChatBotHome: React.FC<Props> = ({navigation}): React.JSX.Element  => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState<[]>([]);
    const [voiceRecognitionEnabled, setVoiceRecognitionEnabled] = useState(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState('')
    const handleQueryChange = (text: string) => {
        console.log('query in parent>>>', text)
        setQuery(text);
      };
    const { startVoiceRecognition, stopVoiceRecognition } = useVoiceRecognition(query, handleQueryChange);
    useEffect(()=>{
       getRecipe()
    },[query])
    const getRecipe=() => {
        if (query) {
         fetchRecipe(query).then(async(recipes: any) => {setRecipes(recipes) }).catch((err:any)=> showSnackbar('Something went wrong while loading recipes'));
        }
      }
    
      
      const handleSelectedFood = (item:any) =>{
        setSelectedRecipeId(item.id)
        console.log('item.id>>>', item.id)
        showRecipeInformation()
      }
      const showRecipeInformation = useCallback(() =>{
        fetchRecipeIngredients(selectedRecipeId).then(async(recipes: any) => {setRecipes(recipes);await saveRecipe(query,recipes)}).catch((err:any)=> showSnackbar('something went wrong'))
    },[selectedRecipeId])
      const handleVoiceRecognitionPress = () => {
        if (voiceRecognitionEnabled) {
          stopVoiceRecognition();
        } else {
          startVoiceRecognition();
        }
        setVoiceRecognitionEnabled(!voiceRecognitionEnabled);
      };
  return (
    <View>
      <ChatBotTextBar queryText={query}  onQueryChange={handleQueryChange} onVoiceRecognitionPress={handleVoiceRecognitionPress} getRecipe={getRecipe}/>
        {recipes.length > 0 && <RecipeList onSelect={handleSelectedFood} recipes={recipes} />}
        {/* {voiceRecognitionEnabled && <Text>Listening...</Text>} */}
    </View>
  )
}

export default ChatBotHome

const styles = StyleSheet.create({})