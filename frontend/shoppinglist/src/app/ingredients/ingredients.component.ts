import { Component } from '@angular/core';
import { IngredientSearchComponent } from "./ingredient-search/ingredient-search.component";
import { IngredientNewComponent } from "./ingredient-new/ingredient-new.component";
import { IngredientListComponent } from "./ingredient-list/ingredient-list.component";
import { AdminComponent } from '../pages/admin/admin.component';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-ingredients',
  imports: [IngredientSearchComponent, IngredientNewComponent, IngredientListComponent, AdminComponent, HeaderComponent],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent {
  search: string = ''

  handleResults(result: string) {
    this.search = result;
  }
}
