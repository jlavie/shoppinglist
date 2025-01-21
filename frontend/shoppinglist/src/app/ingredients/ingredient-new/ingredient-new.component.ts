import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngredientCategory } from '../ingredient.utils';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

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

  formGroup = this.fb.group({
    name: ['',[Validators.required]],
    picto: ['',[Validators.required]],
    category: [IngredientCategory.VEGETABLE, [Validators.required]]
  })
  // formGroup = new FormGroup({
  //   name: new FormControl('',[Validators.required]),
  //   picto: new FormControl('',[Validators.required]),
  //   category: new FormControl(IngredientCategory.VEGETABLE, [Validators.required])
  // })
  ingredientCategory = Object.values(IngredientCategory);
  ingerdientId = -1;

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
    console.log(this.formGroup.value);
  }

  isFieldValid(fieldName: string) {
    const formControl = this.formGroup.get(fieldName);
    return formControl?.invalid && (formControl.dirty || formControl.touched);
  }
}
