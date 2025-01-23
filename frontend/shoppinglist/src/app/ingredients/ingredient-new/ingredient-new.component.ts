import { Component, computed, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
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

  formGroup = this.fb.group({
    name: ['',[Validators.required]],
    icon: ['',[Validators.required]],
    category: [IngredientCategory.VEGETABLE, [Validators.required]]
  })

  ingredientCategory = Object.values(IngredientCategory);
  ingerdientId = -1;
  ingredients = signal<Ingredient[]>([]);

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe( params => {
      if(params['id']) {this.ingerdientId = parseInt(params['id'])}
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  submit(event: Event) {
    event.preventDefault();
    if(this.formGroup.valid) {
      const newIngredient: any = this.formGroup.value;
      this.ingredientService.add(newIngredient).subscribe({
        next: (res) => {
          this.ingredientService.addToSignal(res);
        },
        error: (err) => {return throwError(() => err)}
      })
    }
  }

  isFieldValid(fieldName: string) {
    const formControl = this.formGroup.get(fieldName);
    return formControl?.invalid && (formControl.dirty || formControl.touched);
  }
}
