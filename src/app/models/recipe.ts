

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
export type CuisineType =
  | 'Italian' | 'Asian' | 'Mexican' | 'American'
  | 'French' | 'Indian' | 'Mediterranean' | 'Other';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export class Recipe {
  id?: string;
  recipeId?: string;
  userId?: string;
  title: string = '';
  chef: string = '';
  ingredients: string[] = [];
  instructions: string[] = [];
  mealType?: MealType;
  cuisineType?: CuisineType;
  prepTime: number = 1;
  difficulty?: Difficulty;
  servings: number = 1;
  createdDate?: string;
}


export function createRecipe(
  id: string,
  recipeId: string,
  userId: string,
  title: string,
  chef: string,
  ingredients: string[],
  instructions: string[],
  mealType: MealType,
  cuisineType: CuisineType,
  prepTime: number,
  difficulty: Difficulty,
  servings: number,
  createdDate?: string
): Recipe {
  return {
    id,
    recipeId,
    userId,
    title,
    chef,
    ingredients,
    instructions,
    mealType,
    cuisineType,
    prepTime,
    difficulty,
    servings,
    createdDate
  };
}

