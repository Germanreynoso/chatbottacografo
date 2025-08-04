import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatShellComponent } from './components/chat-shell/chat-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatShellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public showChat: boolean = false;

  toogleChat() {
    this.showChat = !this.showChat;
  }

  onChatClose() {
    this.showChat = false;
  }
}

