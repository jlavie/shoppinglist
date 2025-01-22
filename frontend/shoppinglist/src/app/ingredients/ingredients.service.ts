import { inject, Injectable, signal } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private ingredients = signal<Ingredient[]>([]);
  private http = inject(HttpClient);
  private url = 'http://localhost:3200/api/ingredient/';

  getAll() {
    return this.http
      .get<{ingredients: Ingredient[]}>(this.url + 'all')
      .pipe(
        tap(response => {
          console.log('Données reçues :', response)
          console.log(this.ingredients())
        }),
        catchError(err => {return throwError(() => err)}))
  }

  getOne(id: string) {
    return this.http
      .get(this.url + id)
      .pipe(catchError(err => {return throwError(() => err)}))
  }

  delete(id: string) {
    const prevIngredients = this.ingredients();

    if(prevIngredients.some((p) => p._id === id)) {
      this.ingredients.set(prevIngredients.filter(p => p._id !== id))
    }

    return this.http
      .delete(this.url + id)
      .pipe(catchError((err) => {return throwError(() => err)}))
  }

  add(ingredientData: any):Observable<Ingredient | any> {
    console.log(ingredientData)
    console.log(this.url)

    return this.http
      .post(this.url, ingredientData)
      .pipe(
        tap(response => {
          console.log('Données reçues :', response)
          console.log(this.ingredients())
        }),
        catchError((err) => {return throwError(() => new Error(err))}))
  }
}
