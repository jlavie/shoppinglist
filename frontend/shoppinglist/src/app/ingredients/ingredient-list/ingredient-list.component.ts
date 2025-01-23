import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { IngredientItemComponent } from '../ingredient-item/ingredient-item.component';
import { IngredientsService } from '../ingredients.service';
import { Ingredient } from '../ingredient.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ingredient-list',
  imports: [IngredientItemComponent, MatIconModule],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css'
})
export class IngredientListComponent implements OnInit {
  private ingredientService = inject(IngredientsService);

  ingredients = computed(() => this.ingredientService.ingredientsData());
  
  ngOnInit(): void {
    this.ingredientService.getAll();
  }

  onRemoveIngredient(ingredient: Ingredient) {
    const id = ingredient._id;
    this.ingredientService.delete(id);
  }
}
