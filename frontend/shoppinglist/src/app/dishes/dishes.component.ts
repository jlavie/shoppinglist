import { Component } from '@angular/core';
import { DishNewComponent } from './dish-new/dish-new.component';
import { DishListComponent } from './dish-list/dish-list.component';
import { AdminComponent } from '../pages/admin/admin.component';
import { HeaderComponent } from "../header/header.component";
import { WeeklyMenuComponent } from "../weekly-menu/weekly-menu.component";

@Component({
  selector: 'app-dishes',
  imports: [DishListComponent, AdminComponent, HeaderComponent, DishNewComponent],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.css'
})
export class DishesComponent {

}
