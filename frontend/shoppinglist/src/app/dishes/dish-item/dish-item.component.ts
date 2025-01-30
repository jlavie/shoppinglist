import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Dish } from '../dish.model';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../dish.service';

@Component({
  selector: 'app-dish-item',
  imports: [],
  templateUrl: './dish-item.component.html',
  styleUrl: './dish-item.component.css'
})
export class DishItemComponent implements OnInit {
  dishSignal = signal<any>(undefined);
  private route = inject(ActivatedRoute);
  private dishService = inject(DishService);

  @Input() set dish(value: Dish | null) {
    if(value) {
      this.dishSignal.set(value);
    }
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;

    if(params['id']) {
      this.dishService.getOne(params['id'])
        .subscribe({
          next: (data) => {
            this.dishSignal.set(data)
          }
        })
    }
  }
}
