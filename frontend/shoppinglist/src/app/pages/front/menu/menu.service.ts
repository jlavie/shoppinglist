import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // Données partagées
  private _dishes = new BehaviorSubject<any[]>([]);
  private _weeklyMenu = new BehaviorSubject<{ [key: string]: any[] }>({
    Lundi: [],
    Mardi: [],
    Mercredi: [],
    Jeudi: [],
    Vendredi: [],
    Samedi: [],
    Dimanche: [],
  });

  // Exposer les données comme des observables
  dishes$ = this._dishes.asObservable();
  weeklyMenu$ = this._weeklyMenu.asObservable();

  constructor() {}

  // Méthodes pour mettre à jour les données
  setDishes(dishes: any[]) {
    this._dishes.next(dishes);
  }

  addDishToDay(day: string, dish: any) {
    const currentMenu = this._weeklyMenu.value;
    currentMenu[day] = [...currentMenu[day], dish];
    this._weeklyMenu.next(currentMenu);
  }

  removeDishFromList(dishId: string) {
    const currentDishes = this._dishes.value.filter((dish) => dish._id !== dishId);
    this._dishes.next(currentDishes);
  }

  getWeeklyMenu() {
    return this._weeklyMenu.value;
  }

  getDishes() {
    return this._dishes.value;
  }
}