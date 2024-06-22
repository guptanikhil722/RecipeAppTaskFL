import { getAuthClient } from "../api/authAxios";
import { API_Uri, API_Key } from "../api/constant";
import { showSnackbar } from "../utils/helper";

export const fetchRecipe =  (query: string) => {
    return new Promise(async(resolve, reject)=>{
        if(query === 'listening...') return;
    try {
      const apiClient = await getAuthClient();
      const response = await apiClient.get(
        `${API_Uri}/complexSearch?query=${query}`
      );
      console.log('res>>>>', response.data)
      if(response && response.data){
      resolve(response.data.results)
    } else{
        reject(response)
    }
    } catch (error:any) {
        reject(error)
        console.log('Error fetching recipes:', error);
    //    showSnackbar('Error fetching recipes:');
      return [];
    }
})
  };
export const fetchRecipeIngredients =  (id: any) => {
    return new Promise(async(resolve, reject)=>{
    try {
      const apiClient = await getAuthClient();
      const response = await apiClient.get(
        `${API_Uri}/informationBulk?ids=${id}&includeNutrition=false`
      );
      console.log('res after select>>>>', response.data)
      if(response && response.data){
      resolve(response.data.map((recipe: any) => ({
        id: recipe.id,
        title: recipe.title,
        ingredients: recipe.extendedIngredients.map((ing: any) => ing.original),
        instructions: recipe.analyzedInstructions[0]?.steps.map((step: any) => step.step) || [],
        image: recipe.image
      })))
    } else{
        reject(response)
    }
    } catch (error) {
        reject(error)
        // console.error('Error fetching recipes:', error);
    //    showSnackbar('Error fetching recipes:');
      return [];
    }
})
  };
  