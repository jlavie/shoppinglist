import { Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngredientCategory } from '../ingredient.utils';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { IngredientsService } from '../ingredients.service';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-ingredient-new',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './ingredient-new.component.html',
  styleUrl: './ingredient-new.component.css'
})
export class IngredientNewComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private routeSubscription: Subscription | null = null;
  private fb = inject(FormBuilder);
  private ingredientService = inject(IngredientsService);
  private destroyRef = inject(DestroyRef);

  formGroup = this.fb.group({
    name: ['',[Validators.required]],
    icon: ['',[Validators.required]],
    category: [IngredientCategory.VEGETABLE, [Validators.required]]
  })
  // formGroup = new FormGroup({
  //   name: new FormControl('',[Validators.required]),
  //   icon: new FormControl('',[Validators.required]),
  //   category: new FormControl(IngredientCategory.VEGETABLE, [Validators.required])
  // })
  ingredientCategory = Object.values(IngredientCategory);
  ingerdientId = -1;
  ingredients = signal<Ingredient[]>([]);

  ngOnInit(): void {
    console.log(this.ingredients());
    this.routeSubscription = this.route.params.subscribe( params => {
      if(params['id']) {this.ingerdientId = parseInt(params['id'])}
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  submit(event: Event) {
    event.preventDefault();
    console.log(this.ingredients())
    console.log(this.formGroup.value)
    const subscription = this.ingredientService.add(this.formGroup.value)
      .subscribe({
        next: (res) => {
          console.log(res)
          console.log(res.ingredients)
          console.log(this.ingredients())
            const prevIngredients = this.ingredients();
          // if(prevIngredients.some((p) => p._id === ingredient._id)) {
          //   this.ingredients.set(prevIngredients.filter(p => p._id !== ingredient._id))
          // }
        },
        error: err => console.log('Erreur lors de l\'enregistrement', err)
      })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  isFieldValid(fieldName: string) {
    const formControl = this.formGroup.get(fieldName);
    return formControl?.invalid && (formControl.dirty || formControl.touched);
  }
}
