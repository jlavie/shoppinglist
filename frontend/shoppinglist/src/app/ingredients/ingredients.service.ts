import { inject, Injectable, signal, DestroyRef } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private ingredients = signal<Ingredient[]>([]);
  private http = inject(HttpClient);
  private url = 'http://localhost:3200/api/ingredient/';
  private destroyRef = inject(DestroyRef);


  get ingredientsData() {
    return this.ingredients.asReadonly();
  }

  addToSignal(newIngredient: any): void {
    this.ingredients.update((ingredients) => [...ingredients, newIngredient.ingredient]);
    console.log(newIngredient.ingredient)
    console.log(this.ingredients())
  }

  getAll():void {
    const subscription = this.http
      .get<{ingredients: Ingredient[]}>(this.url + 'all')
      .subscribe({
        next: (data) => this.ingredients.set(data.ingredients),
        error: (err) => {return throwError(() => err)}
      })

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      })
  }

  getOne(id: string): Observable<Ingredient> {
    return this.http.get<Ingredient>(this.url + id);
  }

  delete(id: string) {
    const prevIngredients = this.ingredients();

    if(prevIngredients.some((p) => p._id === id)) {
      this.ingredients.set(prevIngredients.filter(p => p._id !== id))
    }

    const subscription = this.http
      .delete(this.url + id)
      .subscribe({
        error: (err) => {return throwError(() => err)}
      })

      
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  add(data: FormData):Observable<Ingredient> {
    return this.http
      .post<Ingredient>(this.url, data)
  }

  update(id:string, data: FormData):Observable<Ingredient> {
    return this.http
      .patch<Ingredient>(this.url + id, data)
  }

  getIngredientById(id: string): Ingredient | null {
    return this.ingredientsData().find(ingredient => ingredient._id === id) || null;
  }
}
