import { Component, computed, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  private file: File | any = null;
  private router: Router | null = null;

  formGroup = this.fb.group({
    name: ['',[Validators.required]],
    file: [null,[Validators.required]],
    category: [IngredientCategory.VEGETABLE, [Validators.required]]
  })

  ingredientCategory = Object.values(IngredientCategory);
  ingerdientId = '';
  ingredients = signal<Ingredient[]>([]);
  ingredientSignal = signal<any>(undefined)
  params = this.route.snapshot.params;

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe( params => {
      if(params['id']) {
        this.ingerdientId = params['id']
        this.ingredientService.getOne(this.ingerdientId).subscribe({
          next: (data:any) => {
            this.formGroup.patchValue(data);
          }
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement
    // this.file = event.target.files[0];
    if(input?.files && input.files.length > 0) {
      this.file = input.files[0];
      this.formGroup.patchValue({file: this.file});// Met à jour le formulaire
      this.formGroup.get('file')?.updateValueAndValidity();// Valide le champ fichier
    }
  }

  submit(event: Event) {
    event.preventDefault();
    if(this.formGroup.valid) {
      const data = new FormData();

      if(this.formGroup.value.name) {
        data.append('name', this.formGroup.value.name);
      }
      if(this.formGroup.value.category) {
        data.append('category', this.formGroup.value.category);
      }
      if(this.file) {
        data.append('file', this.file);
      }

      // const newIngredient: any = this.formGroup.value;
      if(this.ingerdientId) {
        this.ingredientService.update(this.ingerdientId, data).subscribe({
          next: (data:any) => {
            console.log('Ingrédient mis à jour');
            //this.router?.navigate(['/ingredients']);
          }
        })
      } else {
        this.ingredientService.add(data).subscribe({
          next: (res) => {
            this.ingredientService.addToSignal(res);
          },
          error: (err) => {return throwError(() => err)}
        })
      }
    }
  }

  isFieldValid(fieldName: string) {
    const formControl = this.formGroup.get(fieldName);
    return formControl?.invalid && (formControl.dirty || formControl.touched);
  }
}
