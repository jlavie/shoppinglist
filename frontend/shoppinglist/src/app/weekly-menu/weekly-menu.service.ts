import { computed, Injectable, signal } from '@angular/core';
import { Dish } from '../dishes/dish.model';
import { addDays, formatISO } from 'date-fns';
import { addYears, formatWithOptions } from 'date-fns/fp'
import { fr } from 'date-fns/locale'

@Injectable({
  providedIn: 'root',
})
export class WeeklyMenuService {
  // Utilisez un signal pour stocker le menu hebdomadaire
  // private weeklyMenu = signal<{ [key: string]: Dish[] }>({
  //   Lundi: [],
  //   Mardi: [],
  //   Mercredi: [],
  //   Jeudi: [],
  //   Vendredi: [],
  //   Samedi: [],
  //   Dimanche: [],
  // });
  // Signal pour stocker le jour de départ (par défaut : aujourd'hui + 2 jours)
  private startDay = signal<Date>(addDays(new Date(), 2));

  private weeklyMenu = computed(() => {
    const startDate = this.startDay();
    return Array.from({ length: 7 }, (_, i) => {
      const dateToString = formatWithOptions({ locale: fr }, 'D MMMM YYYY')
      console.log(startDate.toDateString)
      const date = formatISO(addDays(startDate, i), { representation: 'date' });
      return { day: date, dishes: this.weeklyMenuData()[date] || [] };
    });
  });

  // Stockage des plats en brut (clé = date en YYYY-MM-DD, valeur = liste de plats)
  weeklyMenuData = signal<{ [key: string]: Dish[] }>({});

  // Exposer le menu hebdomadaire en lecture seule
  // get weeklyMenuData() {
  //   console.log(this.weeklyMenu)
  //   return this.weeklyMenu;
  // }
  get weeklyMenuSignal() {
    return this.weeklyMenu;
  }

  // Exposer le jour de départ pour affichage/modification
  get startDaySignal() {
    return this.startDay.asReadonly();
  }

  // Modifier le jour de départ (depuis la liste déroulante)
  updateStartDay(newDate: Date) {
    this.startDay.set(newDate);
  }

  // Ajouter un plat à un jour spécifique
  addDishToDay(day: string, dish: Dish) {
    this.weeklyMenuData.set({
      ...this.weeklyMenuData(),
      [day]: [...(this.weeklyMenuData()[day] || []), dish]
    })
  }

  // Supprimer un plat d'un jour spécifique
  removeDishFromDay(day: string, dishId: string) {
    // this.weeklyMenuData.update((menu) => {
    //   menu[day] = menu[day].filter((dish) => dish._id !== dishId);
    //   return menu;
    // });
    this.weeklyMenuData.set({
      ...this.weeklyMenuData(),
      [day]: this.weeklyMenuData()[day]?.filter((dish) => dish._id !== dishId) || [],
    });
  }

  // Mettre à jour un plat dans un jour spécifique
  updateDishInDay(day: string, dishId: string, updatedDish: Dish) {
    this.weeklyMenuData.update((menu) => {
      const index = menu[day].findIndex((dish) => dish._id === dishId);
      if (index !== -1) {
        menu[day][index] = updatedDish;
      }
      return menu;
    });
  }

  // Réinitialiser le menu hebdomadaire
  resetWeeklyMenu() {
    this.startDay.set(addDays(new Date(), 2)); // Réinitialiser au jour +2
  }
}