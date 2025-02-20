import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DishService } from '../../../dishes/dish.service';
import { DishItemComponent } from '../../../dishes/dish-item/dish-item.component';
import { WeeklyMenuComponent } from "../../../weekly-menu/weekly-menu.component";
import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Dish } from '../../../dishes/dish.model';
import { WeeklyMenuService } from '../../../weekly-menu/weekly-menu.service';
import { IngredientsShoppingListService } from '../../../ingredients/ingredients-shopping-list.service';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-menu',
  imports: [DragDropModule, DishItemComponent, WeeklyMenuComponent, CdkDropList, HeaderComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  private dishService = inject(DishService);
  private weeklyMenuService = inject(WeeklyMenuService);
  ingredientsShoppingList = inject(IngredientsShoppingListService);

  weeklyMenu = signal<{ [day: string]: Dish[] }>({});
  
  dishes = computed(() => this.dishService.dishData());

  ngOnInit(): void {
    this.dishService.getAll();
  }
  
  // gérer le déplacement des éléments entre les listes.
  onDrop(event: CdkDragDrop<any[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(this.dishes(), event.previousIndex, event.currentIndex)
    } else {
      const dish = event.previousContainer.data[event.previousIndex];
      const prevday = event.previousContainer.id;
      this.ingredientsShoppingList.removeIngredients(dish.ingredients);

      this.weeklyMenuService.removeDishFromDay(prevday, dish._id);
    }
  }
}
