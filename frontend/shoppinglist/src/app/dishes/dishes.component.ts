import { Component } from '@angular/core';
import { DishNewComponent } from './dish-new/dish-new.component';
import { DishListComponent } from './dish-list/dish-list.component';

@Component({
  selector: 'app-dishes',
  imports: [DishNewComponent, DishListComponent],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.css'
})
export class DishesComponent {

}
