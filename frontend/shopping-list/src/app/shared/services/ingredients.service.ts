import { Injectable, signal } from '@angular/core';
import { Ingredient } from '../../ingredients/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private ingredients = signal<Ingredient[]>([]);

  allIngredients = this.ingredients.asReadonly();

  addIngredient(ingredientData: {title: string, picto: string}) {
    const newIngredient: Ingredient = {
      ...ingredientData, 
      id: Math.random().toString()
    };

    this.ingredients.update((oldIngredients) => [...oldIngredients, newIngredient]);
  }
}
