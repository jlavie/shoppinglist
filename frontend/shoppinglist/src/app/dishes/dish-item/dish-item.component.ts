import { Component, inject, input, Input, OnInit, signal } from '@angular/core';
import { Dish } from '../dish.model';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../dish.service';
import { AdminComponent } from "../../pages/admin/admin.component";
import { HeaderComponent } from "../../header/header.component";
import { DishNewComponent } from "../dish-new/dish-new.component";
import { BadgeComponent } from "../../components/badge/badge.component";
import { LoginService } from '../../pages/login/login.service';

@Component({
  selector: 'app-dish-item',
  imports: [AdminComponent, HeaderComponent, DishNewComponent, BadgeComponent],
  templateUrl: './dish-item.component.html',
  styleUrl: './dish-item.component.css'
})
export class DishItemComponent implements OnInit {
  dishSignal = signal<any>(undefined);
  private route = inject(ActivatedRoute);
  private dishService = inject(DishService);
  params = this.route.snapshot.params;
  showTitleOnly = input();
  loginService = inject(LoginService);

  @Input() set dish(value: Dish | null) {
    if(value) {
      this.dishSignal.set(value);
    }
  }

  ngOnInit(): void {
    if(this.params['id']) {
      this.dishService.getOne(this.params['id'])
        .subscribe({
          next: (data) => {
            this.dishSignal.set(data)
          }
        })
    }
  }

  
  onDelete(dish: Dish) {
    this.dishService.delete(this.dishSignal()._id);
  }

}
