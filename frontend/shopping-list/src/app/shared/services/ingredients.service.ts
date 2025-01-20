import { inject, Injectable, signal } from '@angular/core';
import { Ingredient } from '../../ingredients/ingredient.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

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
    return this.httpClient
      .post('http://localhost:3200/api/ingredient', ingredientData)
      .pipe(catchError((error) => {
        return throwError(() => new Error(error));
      }))
  }

  private fetchIngredients(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ingredients: Ingredient[]}>(url)
      .pipe(catchError((error) => {
        return throwError(() => new Error(errorMessage));
      }))
  }

  removeIngredient(ingredient: Ingredient) {
    return this.httpClient
      .delete('http://localhost:3200/api/ingredient/' + ingredient._id)
      .pipe(
        catchError((error) => {
          return throwError(() => error)
        })
      )
    }
}
