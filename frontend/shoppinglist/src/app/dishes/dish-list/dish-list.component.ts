import { Component, computed, inject } from '@angular/core';
import { Dish } from '../dish.model';
import { DishService } from '../dish.service';
import { DishItemComponent } from '../dish-item/dish-item.component';

@Component({
  selector: 'app-dish-list',
  imports: [DishItemComponent],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.css'
})
export class DishListComponent {
  private dishService = inject(DishService);

  dishes = computed(() => this.dishService.dishData());

  onDelete(dish: Dish) {
    this.dishService.delete(dish._id);
  }
}
