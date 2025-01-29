import { inject, Injectable } from '@angular/core';
import { Dish } from './dish.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3200/api/dish/';

  add(data: FormData): Observable<Dish> {
    return this.http.post<Dish>(this.url, data);
  }  
}
