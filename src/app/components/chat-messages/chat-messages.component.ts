import { Component, Input } from '@angular/core';
import { IMessage } from '../../interfaces/messages';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
  imports: [CommonModule]
})
export class ChatMessagesComponent {
  @Input() messages: IMessage[] = [];

  trackByIndex(index: number, item: IMessage): number {
    return index;
}
}