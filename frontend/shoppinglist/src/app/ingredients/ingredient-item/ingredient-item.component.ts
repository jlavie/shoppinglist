import { Component, input } from '@angular/core';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-ingredient-item',
  imports: [],
  templateUrl: './ingredient-item.component.html',
  styleUrl: './ingredient-item.component.css'
})
export class IngredientItemComponent {
  ingredient = input.required<Ingredient>();
}
