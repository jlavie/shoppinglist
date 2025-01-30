import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Dish } from './dish.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private dishes = signal<Dish[]>([]);
  private http = inject(HttpClient);
  private url = 'http://localhost:3200/api/dish/';
  private destroyRef = inject(DestroyRef);

  get dishData () {
    console.log(this.dishes)
    return this.dishes.asReadonly();
  }

  add(data: FormData): Observable<Dish> {
    return this.http.post<Dish>(this.url, data);
  }

  delete(id: string) {
    const subscription = this.http
      .delete(this.url + id)
      .subscribe({
        error: (err) => {return throwError(() => err)}
      })

    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }

  getAll(): void {
    const subscription = this.http
      .get<{dishes: Dish[]}>(this.url + 'all')
      .subscribe({
        next: (data) => this.dishes.set(data.dishes),
        error: (err) => {return throwError(() => err)}
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
