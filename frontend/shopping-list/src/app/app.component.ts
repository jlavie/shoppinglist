import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IngredientsComponent } from "./ingredients/ingredients.component";

@Component({
  selector: 'app-root',
  imports: [IngredientsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shopping-list';
}
