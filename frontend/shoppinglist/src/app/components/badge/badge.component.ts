import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css'
})
export class BadgeComponent {
  customClass= input();
  content = input();
  iconClass = input();

  baseClass = signal('badge')
  combinedClass = computed(() => `${this.baseClass()} ${this.customClass()}`);
}
