import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'button[app-button], a[app-button]',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  content = input();
  extraClass = input();

  baseClass = signal('button')
  combinedClass = computed(() => `${this.baseClass()} ${this.extraClass()}`);
}
