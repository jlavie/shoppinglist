import { ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DishItemComponent } from '../dishes/dish-item/dish-item.component';
import { Dish } from '../dishes/dish.model';
import { DishService } from '../dishes/dish.service';
import { WeeklyMenuService } from './weekly-menu.service';

@Component({
  selector: 'app-weekly-menu',
  standalone: true,
  templateUrl: './weekly-menu.component.html',
  imports: [CommonModule, CdkDropList, CdkDrag, DishItemComponent],
})
export class WeeklyMenuComponent {
  private weeklyMenuService = inject(WeeklyMenuService);
  private cdr = inject(ChangeDetectorRef);

  daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  weeklyMenu = this.weeklyMenuService.weeklyMenuData;

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
  ngOnInit() {
    // Forcer la détection des changements
    this.cdr.detectChanges();
  }

  // ngOnInit() {
  //   this.weeklyMenu = this.weeklyMenuService.weeklyMenuData;
  //   // Récupérer le menu hebdomadaire depuis WeeklyMenuService
  //   this.weeklyMenuService.weeklyMenuData.subscribe((menu) => {
  //     this.weeklyMenu = menu;
  //   });
  // }
  

  // constructor(private dishService: DishService) {
  //   this.daysOfWeek.forEach((day) => {
  //     this.weeklyMenu.update((menu) => ({ ...menu, [day]: [] }));
  //   });
  // }

  drop(event: CdkDragDrop<Dish[]>, day: string) {
    console.log(event.previousContainer);
    console.log(event.container);
    if (event.previousContainer === event.container) {
      console.log('Déplacement dans la même liste');
      console.log('Previous Container ID:', event.previousContainer.id);
      console.log('Current Container ID:', event.container.id);
          moveItemInArray(this.weeklyMenu()[day], event.previousIndex, event.currentIndex);
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('Previous Container ID:', event.previousContainer.id);
      console.log('Current Container ID:', event.container.id);
          console.log('Déplacement entre deux listes');
      const dish = event.previousContainer.data[event.previousIndex];

      // Ajouter le plat au jour spécifique dans WeeklyMenuService
      this.weeklyMenuService.addDishToDay(day, dish);
      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex
      // );
      // this.weeklyMenu.update((menu) => ({ ...menu, [day]: event.container.data }));
    }
  }
}
