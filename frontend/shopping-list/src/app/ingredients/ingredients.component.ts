import { Component, output } from '@angular/core';
import { IngredientsListComponent } from "./ingredients-list/ingredients-list.component";
import { NewIngredientComponent } from "./new-ingredient/new-ingredient.component";
import { Ingredient } from './ingredient.model';

@Component({
  selector: 'app-ingredients',
  imports: [IngredientsListComponent, NewIngredientComponent],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent {
  selectIngredient = output<Ingredient>();
}

