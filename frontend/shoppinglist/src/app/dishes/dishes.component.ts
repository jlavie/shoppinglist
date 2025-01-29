import { Component } from '@angular/core';
import { DishNewComponent } from './dish-new/dish-new.component';

@Component({
  selector: 'app-dishes',
  imports: [DishNewComponent],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.css'
})
export class DishesComponent {

}
