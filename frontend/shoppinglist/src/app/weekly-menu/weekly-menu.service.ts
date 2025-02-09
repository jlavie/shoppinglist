import { Injectable, signal } from '@angular/core';
import { Dish } from '../dishes/dish.model';

@Injectable({
  providedIn: 'root',
})
export class WeeklyMenuService {
  // Utilisez un signal pour stocker le menu hebdomadaire
  private weeklyMenu = signal<{ [key: string]: Dish[] }>({
    Lundi: [],
    Mardi: [],
    Mercredi: [],
    Jeudi: [],
    Vendredi: [],
    Samedi: [],
    Dimanche: [],
  });

  // Exposer le menu hebdomadaire en lecture seule
  get weeklyMenuData() {
    console.log(this.weeklyMenu)
    return this.weeklyMenu.asReadonly();
  }

  // Ajouter un plat à un jour spécifique
  addDishToDay(day: string, dish: Dish) {
    this.weeklyMenu.update((menu) => {
      menu[day] = [...menu[day], dish];
      return menu;
    });
  }

  // Supprimer un plat d'un jour spécifique
  removeDishFromDay(day: string, dishId: string) {
    this.weeklyMenu.update((menu) => {
      menu[day] = menu[day].filter((dish) => dish._id !== dishId);
      return menu;
    });
  }

  // Mettre à jour un plat dans un jour spécifique
  updateDishInDay(day: string, dishId: string, updatedDish: Dish) {
    this.weeklyMenu.update((menu) => {
      const index = menu[day].findIndex((dish) => dish._id === dishId);
      if (index !== -1) {
        menu[day][index] = updatedDish;
      }
      return menu;
    });
  }

  // Réinitialiser le menu hebdomadaire
  resetWeeklyMenu() {
    this.weeklyMenu.set({
      Lundi: [],
      Mardi: [],
      Mercredi: [],
      Jeudi: [],
      Vendredi: [],
      Samedi: [],
      Dimanche: [],
    });
  }
}