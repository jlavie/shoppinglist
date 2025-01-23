import { Component, computed, inject, Input, input, OnInit, signal } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ActivatedRoute } from '@angular/router';
import { IngredientsService } from '../ingredients.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-ingredient-item',
  imports: [],
  templateUrl: './ingredient-item.component.html',
  styleUrl: './ingredient-item.component.css'
})
export class IngredientItemComponent implements OnInit {
  // ingredient = input.required<Ingredient>();
  @Input() set ingredient(value: Ingredient | null) {
    if (value) {
      this.ingredientSignal.set(value); // Met à jour le signal avec l'Input
      console.log(this.ingredientSignal())
    }
  }
  private route = inject(ActivatedRoute);
  private ingredientService = inject(IngredientsService);
  ingredientSignal = signal<any>(undefined)

  ngOnInit(): void {
    const params = this.route.snapshot.params;

    if(params['id']) {
      this.ingredientService.getOne(params['id']).subscribe({
        next: (data:any) => {
          this.ingredientSignal.set(data)
        }
      })
    }
  }
}
