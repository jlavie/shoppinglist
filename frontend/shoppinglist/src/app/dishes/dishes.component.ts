import { Component } from '@angular/core';
import { DishNewComponent } from './dish-new/dish-new.component';
import { DishListComponent } from './dish-list/dish-list.component';
import { AdminComponent } from '../pages/admin/admin.component';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-dishes',
  imports: [DishNewComponent, DishListComponent, AdminComponent, HeaderComponent],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.css'
})
export class DishesComponent {

}
