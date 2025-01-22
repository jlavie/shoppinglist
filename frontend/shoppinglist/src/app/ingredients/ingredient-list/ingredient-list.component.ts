import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
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
  private destroyRef = inject(DestroyRef);

  ingredients = signal<Ingredient[]>([]);
  
  ngOnInit(): void {
    const subscription = this.ingredientService.getAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.ingredients.set(res.ingredients);
        }
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onRemoveIngredient(ingredient: Ingredient) {
    const id = ingredient._id;
    const subscription = this.ingredientService.delete(id)
      .subscribe({
        next: () => {
          const prevIngredients = this.ingredients();
          if(prevIngredients.some((p) => p._id === ingredient._id)) {
            this.ingredients.set(prevIngredients.filter(p => p._id !== ingredient._id))
          }
        },
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      })
  }
}
