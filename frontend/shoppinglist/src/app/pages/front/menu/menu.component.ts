import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DishService } from '../../../dishes/dish.service';
import { DishItemComponent } from '../../../dishes/dish-item/dish-item.component';
import { WeeklyMenuComponent } from "../../../weekly-menu/weekly-menu.component";
import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Dish } from '../../../dishes/dish.model';
import { WeeklyMenuService } from '../../../weekly-menu/weekly-menu.service';

@Component({
  selector: 'app-menu',
  imports: [DragDropModule, DishItemComponent, WeeklyMenuComponent, CdkDropList],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  private dishService = inject(DishService);
  private weeklyMenuService = inject(WeeklyMenuService);

    weeklyMenu = signal<{ [day: string]: Dish[] }>({});
  
  dishes = computed(() => this.dishService.dishData());

  ngOnInit(): void {
    this.dishService.getAll();
    console.log(this.dishes)
  }

    // drop(event: CdkDragDrop<Dish[]>, day: string) {
    //   console.log(event.previousContainer);
    //   console.log(event.container);
    //     if (event.previousContainer === event.container) {
    //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    //   } else {
    //     transferArrayItem(
    //       event.previousContainer.data,
    //       event.container.data,
    //       event.previousIndex,
    //       event.currentIndex
    //     );
    //     this.weeklyMenu.update((menu) => ({ ...menu, [day]: event.container.data }));
    //   }
    // }
  
  // gérer le déplacement des éléments entre les listes.
  onDrop(event: CdkDragDrop<any[]>) {
    if(event.previousContainer === event.container) {
      console.log('===');
      console.log('Event:', event);
  console.log('Previous Container ID:', event.previousContainer.id);
  console.log('Current Container ID:', event.container.id);

      moveItemInArray(this.dishes(), event.previousIndex, event.currentIndex)
    } else {
      console.log('!==');

      const dish = event.previousContainer.data[event.previousIndex];
      const day = event.container.id;

      this.weeklyMenuService.addDishToDay(day, dish);
      // this.dishService.delete(dish._id)
      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex
      // )
    }
  }
}
