import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import RecipeListItem from './RecipeListItem';

interface Props {
  recipes: any;
  onSelect:  Function
}

const RecipeList: React.FC<Props> = ({ onSelect, recipes}) => {
   
  return (
    <FlatList
      data={recipes}
      renderItem={({ item }) => <RecipeListItem onSelect={onSelect} recipe={item} />}
      keyExtractor={(item) => item.id.toString()}
      style={{marginBottom:'30%'}}
    />
  );
};

export default RecipeList;