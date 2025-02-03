import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Dish } from '../dish.model';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../dish.service';
import { AdminComponent } from "../../pages/admin/admin.component";
import { HeaderComponent } from "../../header/header.component";
import { DishNewComponent } from "../dish-new/dish-new.component";

@Component({
  selector: 'app-dish-item',
  imports: [AdminComponent, HeaderComponent, DishNewComponent],
  templateUrl: './dish-item.component.html',
  styleUrl: './dish-item.component.css'
})
export class DishItemComponent implements OnInit {
  dishSignal = signal<any>(undefined);
  private route = inject(ActivatedRoute);
  private dishService = inject(DishService);
  params = this.route.snapshot.params;

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
}
