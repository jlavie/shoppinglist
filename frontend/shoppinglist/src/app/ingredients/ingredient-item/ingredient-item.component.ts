import { Component, computed, inject, Input, input, OnInit, signal } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ActivatedRoute } from '@angular/router';
import { IngredientsService } from '../ingredients.service';
import { AdminComponent } from "../../pages/admin/admin.component";
import { HeaderComponent } from "../../header/header.component";
import { IngredientNewComponent } from "../ingredient-new/ingredient-new.component";

@Component({
  selector: 'app-ingredient-item',
  imports: [AdminComponent, HeaderComponent, IngredientNewComponent],
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
  params = this.route.snapshot.params;

  ngOnInit(): void {

    if(this.params['id']) {
      this.ingredientService.getOne(this.params['id']).subscribe({
        next: (data:any) => {
          this.ingredientSignal.set(data)
        }
      })
    }
  }
}
