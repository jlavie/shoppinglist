import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { IngredientsService } from '../../shared/services/ingredients.service';
import { IngredientItemComponent } from './ingredient-item/ingredient-item.component';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-ingredients-list',
  imports: [IngredientItemComponent],
  templateUrl: './ingredients-list.component.html',
  styleUrl: './ingredients-list.component.css'
})
export class IngredientsListComponent implements OnInit {
  private ingredientsService = inject(IngredientsService);
  private destroyRef = inject(DestroyRef);

  // ingredients = computed(() => this.ingredientsService.allIngredients());
  ingredients = signal<Ingredient[]>([]);
  
  ngOnInit(): void {
    const subsription = this.ingredientsService.loadAllIngredients().subscribe({
      next: (res) => {
        // res.ingredients.forEach(item => {
        //   console.log(item.title);
        //   console.log(item._id);
        // });
        // console.log('_id récupéré :', res._id);
        // console.log(res.ingredients)
        this.ingredients.set(res.ingredients) 
      }
    });

    this.destroyRef.onDestroy(() => {
      subsription.unsubscribe();
    })
  }
}
