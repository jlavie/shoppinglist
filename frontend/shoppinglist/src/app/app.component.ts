import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IngredientListComponent } from "./ingredients/ingredient-list/ingredient-list.component";
import { IngredientSearchComponent } from "./ingredients/ingredient-search/ingredient-search.component";
import { IngredientNewComponent } from "./ingredients/ingredient-new/ingredient-new.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IngredientListComponent, IngredientSearchComponent, IngredientNewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shoppinglist';
  search: string = ''

  handleResults(result: string) {
    this.search = result;
  }
}
