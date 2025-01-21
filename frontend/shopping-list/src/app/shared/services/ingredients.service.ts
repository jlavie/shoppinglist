import { inject, Injectable, signal } from '@angular/core';
import { Ingredient } from '../../ingredients/ingredient.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private ingredients = signal<Ingredient[]>([]);
  private httpClient = inject(HttpClient);

  loadAllIngredients() {
    return this.fetchIngredients(
      'http://localhost:3200/api/ingredient/all',
      'Something went wrong. Please try again later.'
    )
  }

  getIngredient(ingredient: Ingredient) {
    return this.httpClient
      .get('http://localhost:3200/api/ingredient/' + ingredient._id)
      .pipe(
        catchError(error => { return throwError(() => error)})
      )
  }

  addIngredient(ingredientData: {title: string, picto: string}):Observable<Ingredient | any> {
    const prevIngredients = this.ingredients();
    console.log(prevIngredients)
    return this.httpClient
      .post('http://localhost:3200/api/ingredient', ingredientData)
      .pipe(
        tap(response => {
          console.log('Données reçues :', response)
          console.log(this.ingredients())
        }),
        // map(response => this.ingredients.set(this.ingredients().shift())),
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      )
  }

  private fetchIngredients(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ingredients: Ingredient[]}>(url)
      .pipe(
        // map(res => this.ingredients.set(this.ingredients())),
        catchError((error) => {
        return throwError(() => new Error(errorMessage));
      }))
  }

  removeIngredient(ingredient: Ingredient) {
    const prevIngredients = this.ingredients();
    console.log(prevIngredients)
    console.log(ingredient)
    if(prevIngredients.some((p) => p._id === ingredient._id)) {
      this.ingredients.set(prevIngredients.filter(p => p._id !== ingredient._id))
    }

    return this.httpClient
      .delete('http://localhost:3200/api/ingredient/' + ingredient._id)
      .pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }
}
