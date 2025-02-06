import { Ingredient } from "../ingredients/ingredient.model";

export interface Dish {
    _id: string;
    title: string; 
    description: string; 
    image: string;
    category: string; 
    difficulty: string; 
    budget: string;
    ingredients: {
        ingredient: Ingredient;
        quantity: number;
    }[];
}