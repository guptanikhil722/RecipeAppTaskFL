import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getScreenHeightWidht } from '../utils/helper';
interface Props {
  recipe: any;
  onSelect : Function
}
const screen = getScreenHeightWidht()
const RecipeListItem: React.FC<Props> = ({ recipe, onSelect }) => {
  return (
    <>
{recipe.ingredients || recipe.instructions ?
   
    <View style={styles.informationCard}>
          {recipe.ingredients?
          <View style={styles.informationCard}>
            <Text style={styles.informationTitle}>Ingredients</Text>
          <Text style={styles.ingredients}>{recipe.ingredients.join(', ')}</Text>
          </View>:null}
          {recipe.instructions?
          <View style={styles.informationCard}>
            <Text style={styles.informationTitle}>Informations</Text>
          <Text style={styles.instructions}>{recipe.instructions}</Text>
          </View>:null}
          </View>:
           <TouchableOpacity onPress={()=>onSelect(recipe)} style={styles.card}>
           <Text style={styles.title}>{recipe.title}</Text>
     
           {recipe.image?<Image source={{uri: recipe.image}} style={styles.image}/>:null}
         </TouchableOpacity>
          }
          </>
  );
};

const styles = StyleSheet.create({
  card: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding: 16,
    margin: 8,
    marginHorizontal: '4%',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: screen.width / 1.1
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color:'#000000',
    width: '70%'
  },
  ingredients: {
    fontSize: 16,
    color: '#666',
  },
  instructions: {
    fontSize: 16,
    color: '#666',
  },
  image:{
    height: '100%',
    width: ' 18%'
  },
  informationCard:{
    display: 'flex',
    flexDirection: 'column',
    padding: '5%',
    margin: 'auto'
  },
  informationTitle:{
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default RecipeListItem;