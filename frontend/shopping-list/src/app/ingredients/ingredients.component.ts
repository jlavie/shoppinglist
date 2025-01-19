import { Component } from '@angular/core';
import { IngredientsListComponent } from "./ingredients-list/ingredients-list.component";
import { NewIngredientComponent } from "./new-ingredient/new-ingredient.component";

@Component({
  selector: 'app-ingredients',
  imports: [IngredientsListComponent, NewIngredientComponent],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent {}

