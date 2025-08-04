import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-typing-indicator',
  standalone: true,
  templateUrl: './typing-indicator.component.html',
  styleUrls: ['./typing-indicator.component.css'],
  imports: [CommonModule]
})
export class TypingIndicatorComponent {
  @Input() show: boolean = false;
}
