import AsyncStorage from '@react-native-async-storage/async-storage';

const RECIPES_KEY = 'RECIPES_KEY';

export const saveRecipe = async (query: string, recipe: any) => {
  try {
    const existingRecipes = await getSavedRecipes();
    const newRecipes = { ...existingRecipes, [query]: recipe };
    await AsyncStorage.setItem(RECIPES_KEY, JSON.stringify(newRecipes));
  } catch (error) {
    console.error('Error saving recipe:', error);
  }
};

export const getSavedRecipes = async () => {
  try {
    const savedRecipes = await AsyncStorage.getItem(RECIPES_KEY);
    return savedRecipes ? JSON.parse(savedRecipes) : {};
  } catch (error) {
    console.error('Error getting saved recipes:', error);
    return {};
  }
};