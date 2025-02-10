import { inject, Injectable, signal } from '@angular/core';
import { IngredientsService } from './ingredients.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsShoppingListService {
  private ingredientsService = inject(IngredientsService);
  ingredientsShoppingList = signal< any[]>([]);

  addIngredients(ingredients:  any[]) {
    const currentIngredients = this.ingredientsShoppingList();

    const updatedIngredients = [...currentIngredients];
    ingredients.forEach(ingredient => {
      const existingIngredient = updatedIngredients.find(
        item => item._id === ingredient._id
      );

      if(existingIngredient) {
        existingIngredient.quantity += ingredient.quantity;
      } else {

        this.ingredientsService.getOne(ingredient._id).subscribe({
          next: (data:any) => {
            console.log(data)
            updatedIngredients.push({...data, quantity: ingredient.quantity});
          }
        })
      }
    });

    this.ingredientsShoppingList.set(updatedIngredients);
  }

  removeIngredients(ingredients:  any[]) {
    const currentIngredients = this.ingredientsShoppingList();

    let updatedIngredients = [...currentIngredients];
    ingredients.forEach(ingredient => {
      const existingIngredient = updatedIngredients.find(
        item => item._id === ingredient._id
      );

      existingIngredient.quantity -= ingredient.quantity;
      if(existingIngredient.quantity == 0) {
        updatedIngredients = updatedIngredients.filter(ingredient => ingredient._id !== existingIngredient._id);
      }
    });

    this.ingredientsShoppingList.set(updatedIngredients);
  }

  clearShoppingList() {
    this.ingredientsShoppingList.set([]);
  }
}
