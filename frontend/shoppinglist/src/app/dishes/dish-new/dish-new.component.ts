import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DishBudget, DishCategory, DishDifficulty } from '../dish.utils';
import { DishService } from '../dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-dish-new',
  imports: [ReactiveFormsModule],
  templateUrl: './dish-new.component.html',
  styleUrl: './dish-new.component.css'
})
export class DishNewComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private image: File | any = null;
  private dishService = inject(DishService);
  private router: Router | null = null;
  private route = inject(ActivatedRoute);
  private routeSubscription: Subscription | null = null;

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
  dishId = '';

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      if(params['id']) {
        this.dishId = params['id'];
        this.dishService.getOne(this.dishId).subscribe({
          next: (data: any) => {
            this.formGroup.patchValue(data);
          }
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

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

      if(this.dishId) {
        this.dishService.update(this.dishId, data);
      } else {
        this.dishService.add(data).subscribe({
          next: res => {
            this.dishService.addToSignal(res);
          },
          error: err => {return throwError(() => err)}
        });
      }
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
