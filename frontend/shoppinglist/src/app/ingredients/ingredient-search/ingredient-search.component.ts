import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredient-search',
  imports: [FormsModule],
  templateUrl: './ingredient-search.component.html',
  styleUrl: './ingredient-search.component.css'
})
export class IngredientSearchComponent {
  searchValue = output<string>();
  searchContent = '';

  onSearch(): void {
    console.log(this.searchContent);
    this.searchValue.emit(this.searchContent);
  }
}
