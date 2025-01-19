import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { IngredientsService } from '../../shared/services/ingredients.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-new-ingredient',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './new-ingredient.component.html',
  styleUrl: './new-ingredient.component.css'
})
export class NewIngredientComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  private ingredientService = inject(IngredientsService);

  onAddIngredient(title: string, picto: string) {
    this.ingredientService.addIngredient({title, picto});
    this.formEl()?.nativeElement.reset();
  }
}
