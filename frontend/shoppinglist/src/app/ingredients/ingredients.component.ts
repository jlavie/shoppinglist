import { Component } from '@angular/core';
import { IngredientSearchComponent } from "./ingredient-search/ingredient-search.component";
import { IngredientNewComponent } from "./ingredient-new/ingredient-new.component";
import { IngredientListComponent } from "./ingredient-list/ingredient-list.component";

@Component({
  selector: 'app-ingredients',
  imports: [IngredientSearchComponent, IngredientNewComponent, IngredientListComponent],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent {
  search: string = ''

  handleResults(result: string) {
    this.search = result;
  }
}
