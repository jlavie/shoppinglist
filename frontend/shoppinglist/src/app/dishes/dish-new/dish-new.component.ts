import { ChangeDetectorRef, Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DishBudget, DishCategory, DishDifficulty } from '../dish.utils';
import { DishService } from '../dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { Ingredient } from '../../ingredients/ingredient.model';
import { IngredientsService } from '../../ingredients/ingredients.service';
import { BadgeComponent } from "../../components/badge/badge.component";

@Component({
  selector: 'app-dish-new',
  imports: [ReactiveFormsModule, FormsModule, BadgeComponent],
  templateUrl: './dish-new.component.html',
  styleUrl: './dish-new.component.css'
})
export class DishNewComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private image: File | any = null;
  private dishService = inject(DishService);
  private ingredientService = inject(IngredientsService);
  private router: Router | null = null;
  private route = inject(ActivatedRoute);
  private routeSubscription: Subscription | null = null;

  formGroup = this.fb.group({
    title: ['',[Validators.required]], 
    description: ['',[]],
    image: [null,[Validators.required]],
    category: [DishCategory.STARTER, [Validators.required]],
    difficulty: [DishDifficulty.EASY, [Validators.required]],
    budget: [DishBudget.LOW, [Validators.required]],
    // ingredients: this.fb.array([])
  })
  dishCategory = Object.values(DishCategory);
  dishDifficulty = Object.values(DishDifficulty);
  dishBudget = Object.values(DishBudget);
  dishId = '';
  // availableIngredients = this.ingredientService.ingredientsData;
  selectedIngredients = signal<{ ingredient: Ingredient; quantity: number }[]>([]);
  searchQuery = signal<string>('');
  
  ingredientsList = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.ingredientService.ingredientsData().filter(ingredient =>
      ingredient.name.toLowerCase().includes(query)
    );
  });

  // get ingredientsArray(): FormArray {
  //   return this.formGroup.get('ingredients') as FormArray;
  // }

  ngOnInit(): void {
    this.ingredientService.getAll();
    this.routeSubscription = this.route.params.subscribe(params => {
      if(params['id']) {
        this.dishId = params['id'];
        this.dishService.getOne(this.dishId).subscribe({
          next: (data: any) => {
            this.formGroup.patchValue(data);
            console.log(data)
            if (data.ingredients && Array.isArray(data.ingredients)) {
              const formattedIngredients = data.ingredients.map((ing: {ingredient: Ingredient; quantity: number}) => ({
                ingredient: this.ingredientService.getIngredientById(ing.ingredient._id), // Trouver l'ingrédient dans la liste globale
                quantity: ing.quantity
              }));
  
              // Mettre à jour le signal selectedIngredients
              this.selectedIngredients.set(formattedIngredients);
            }
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

      // data.append('ingredients', JSON.stringify(this.selectedIngredients()));
      const formattedIngredients = this.selectedIngredients().map(item => ({
        _id: item.ingredient._id,
        quantity: item.quantity
      }))
      // data.append('ingredients', JSON.stringify(formattedIngredients));

      formattedIngredients.forEach((ingredient, index) => {
        data.append(`ingredients[${index}][_id]`, ingredient._id);
        data.append(`ingredients[${index}][quantity]`, ingredient.quantity.toString());
      });

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

  addIngredient(ingredient: Ingredient) {
    console.log(this.selectedIngredients())
    if(this.selectedIngredients().find(i => i.ingredient._id === ingredient._id)) {
      return
    }

    // this.ingredientsArray.push(ingredient);
    console.log(ingredient)
    this.selectedIngredients.update(ingredients => [
      ...ingredients,
      {ingredient, quantity: 1}
    ])
    // console.log(this.ingredientsArray)
    console.log(this.selectedIngredients())

    // this.updateSelectedIngredients();


    console.log('Ingrédient ajouté :', ingredient);
    // console.log('Liste actuelle des ingrédients dans FormArray :', this.ingredientsArray.value);

  }

  // updateSelectedIngredients() {
  //   this.selectedIngredients.set(this.ingredientsArray.value);
  // }

  removeIngredient(index: number) {
    this.selectedIngredients.update(ingredients =>
      ingredients.filter((_, i) => i !== index)
    );
  }

  updateIngredientQuantity(index: number, newQuantity: string) {
    const quantity = Number(newQuantity);
    if (quantity < 1) return;
    // const inputElement = event.target as HTMLInputElement;
    // const quantity = Number(inputElement.value);
    console.log(quantity)
    console.log(index)
    // this.selectedIngredients.update(ingredients => {
    //   console.log(ingredients)
    //   ingredients[index].quantity = Number(quantity);
    //   return [...ingredients];
    // });
    this.selectedIngredients.update(ingredients =>
      ingredients.map((item, i) =>
        i === index ? { ...item, quantity } : item
      )
    );
  }

  // onIngredientChange(event: Event): void {
  //   const target = event.target as HTMLSelectElement;
  //   if (target) {
  //     const ingredientId = target.value;
  //     const ingredient = this.findIngredientById(ingredientId);
  //     if (ingredient) {
  //       this.addIngredient(ingredient);
  //     }
  //   }
  // }

  // findIngredientById(id: string): Ingredient | undefined {
  //   return this.availableIngredients().find(ingredient => ingredient._id === id);
  // }

  searchIngredient(query: string) {
    this.searchQuery.set(query);
  }

  // getIngredientFormGroup(index: number): FormGroup {
  //   return this.ingredientsArray.at(index) as FormGroup;
  // }
}
