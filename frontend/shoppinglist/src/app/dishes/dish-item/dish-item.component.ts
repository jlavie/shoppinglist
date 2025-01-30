import { Component, Input, signal } from '@angular/core';
import { Dish } from '../dish.model';

@Component({
  selector: 'app-dish-item',
  imports: [],
  templateUrl: './dish-item.component.html',
  styleUrl: './dish-item.component.css'
})
export class DishItemComponent {
  dishSignal = signal<any>(undefined);

  @Input() set dish(value: Dish | null) {
    if(value) {
      this.dishSignal.set(value);
    }
  }
}
