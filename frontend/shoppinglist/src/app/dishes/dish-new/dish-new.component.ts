import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DishBudget, DishCategory, DishDifficulty } from '../dish.utils';
import { DishService } from '../dish.service';

@Component({
  selector: 'app-dish-new',
  imports: [ReactiveFormsModule],
  templateUrl: './dish-new.component.html',
  styleUrl: './dish-new.component.css'
})
export class DishNewComponent {
  private fb = inject(FormBuilder);
  private image: File | any = null;
  private dishService = inject(DishService);

  formGroup = this.fb.group({
    title: ['',[Validators.required]], 
    description: ['',[]],
    image: [null,[Validators.required]],
    category: [DishCategory.STARTER, [Validators.required]],
    difficulty: [DishDifficulty.EASY, [Validators.required]],
    budget: [DishBudget.LOW, [Validators.required]]
  })
  dishCategory = Object.values(DishCategory);
  dishDifficulty = Object.values(DishDifficulty);
  dishBudget = Object.values(DishBudget);

  onSubmit(event: Event) {
    event.preventDefault();
    if(this.formGroup.valid) {
      const data = new FormData();
      this.formGroup.value.title ? data.append('title', this.formGroup.value.title) : '';
      this.formGroup.value.description ? data.append('description', this.formGroup.value.description) : '';
      this.image ? data.append('image', this.image) : '';
      this.formGroup.value.category ? data.append('category', this.formGroup.value.category) : '';
      this.formGroup.value.difficulty ? data.append('difficulty', this.formGroup.value.difficulty) : '';
      this.formGroup.value.budget ? data.append('budget', this.formGroup.value.budget) : '';

      this.dishService.add(data).subscribe();
    }
  }

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if(input?.files && input.files.length > 0) {
      this.image = input.files[0];
      this.formGroup.patchValue({image: this.image});
      this.formGroup.get('image')?.updateValueAndValidity();
    }
  }

  isFieldValid(fieldName: string) {
    const formControl = this.formGroup.get(fieldName);
    return formControl?.invalid && (formControl.dirty || formControl.touched);
  }
}
