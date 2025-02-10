import { ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DishItemComponent } from '../dishes/dish-item/dish-item.component';
import { Dish } from '../dishes/dish.model';
import { WeeklyMenuService } from './weekly-menu.service';
import { IngredientsShoppingListService } from '../ingredients/ingredients-shopping-list.service';

@Component({
  selector: 'app-weekly-menu',
  standalone: true,
  templateUrl: './weekly-menu.component.html',
  imports: [CommonModule, CdkDropList, CdkDrag, DishItemComponent],
})
export class WeeklyMenuComponent {
  weeklyMenuService = inject(WeeklyMenuService);
  ingredientsShoppingList = inject(IngredientsShoppingListService);

  daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  weeklyMenu = this.weeklyMenuService.weeklyMenuData;
  weeklyMenuSignal = this.weeklyMenuService.weeklyMenuSignal;
  startDaySignal = this.weeklyMenuService.startDaySignal;

  shoppingList = computed(() => {
    const ingredientsMap = new Map<string, number>();

    Object.values(this.weeklyMenu()).forEach((dishes) => {
      dishes.forEach((dish) => {
        dish.ingredients.forEach((ing) => {
          const existingQty = ingredientsMap.get(ing.ingredient.name) || 0;
          ingredientsMap.set(ing.ingredient.name, existingQty + ing.quantity);
        });
      });
    });

    return Array.from(ingredientsMap.entries()).map(([name, quantity]) => ({ name, quantity }));
  });

  drop(event: CdkDragDrop<Dish[]>, day: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.weeklyMenu()[day], event.previousIndex, event.currentIndex);
    } else {
      const dish = event.previousContainer.data[event.previousIndex];

      if(event.previousContainer.id === 'dishes-list') {
        this.ingredientsShoppingList.addIngredients(dish.ingredients);
        this.weeklyMenuService.addDishToDay(day, dish);
      } else {
        this.ingredientsShoppingList.removeIngredients(dish.ingredients);
        this.weeklyMenuService.addDishToDay(day, dish);
        this.weeklyMenuService.removeDishFromDay(event.previousContainer.id, dish._id);
      }
    }
  }
}
