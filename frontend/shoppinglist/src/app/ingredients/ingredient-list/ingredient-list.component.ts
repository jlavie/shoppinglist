import { Component } from '@angular/core';
import { IngredientItemComponent } from '../ingredient-item/ingredient-item.component';

@Component({
  selector: 'app-ingredient-list',
  imports: [IngredientItemComponent],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css'
})
export class IngredientListComponent {

}
