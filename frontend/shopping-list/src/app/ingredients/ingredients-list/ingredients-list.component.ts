import { Component, computed, inject } from '@angular/core';
import { IngredientsService } from '../../shared/services/ingredients.service';
import { IngredientItemComponent } from './ingredient-item/ingredient-item.component';

@Component({
  selector: 'app-ingredients-list',
  imports: [IngredientItemComponent],
  templateUrl: './ingredients-list.component.html',
  styleUrl: './ingredients-list.component.css'
})
export class IngredientsListComponent {
  private ingredientsService = inject(IngredientsService);

  ingredients = computed(() => this.ingredientsService.allIngredients());
}
