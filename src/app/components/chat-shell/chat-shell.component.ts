import { Component } from '@angular/core';

// @Component({
//   selector: 'app-chat-shell',
//   standalone: true,
//   templateUrl: './chat-shell.component.html',
//   styleUrls: ['./chat-shell.component.css'],
// })
import { EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { TypingIndicatorComponent } from '../typing-indicator/typing-indicator.component';
import { ChatMessageService } from '../../services/chat-message.service';
import { IMessage } from '../../interfaces/messages';
import { getSessionId } from '../../services/session.util';

@Component({
  selector: 'app-chat-shell',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessagesComponent,
    ChatInputComponent,
    TypingIndicatorComponent
  ],
  templateUrl: './chat-shell.component.html',
  styleUrls: ['./chat-shell.component.css'],
})
export class ChatShellComponent {
  @Output() close = new EventEmitter<void>();

  public messages: IMessage[] = [];
  public askForm: FormGroup;
  public typing = false;

  private _chatMessageService = inject(ChatMessageService);
  private _fb = inject(FormBuilder);
  private _needToScroll = false;

  constructor() {
    this.askForm = this._fb.group({
      user_message: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(150)],
      ],
    });
  }

  sendAskSubmit() {
    const data = this.askForm.value;
    this.askForm.reset();
    const temNumber = Math.floor(Math.random() * 1000000);
    const tempMessage: IMessage = {
      user_message: data.user_message?.toString() || '',
      bot_response: 'Escribiendo...',
      create_at: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      temp_number: temNumber,
    };
    this.pushMessage(tempMessage);
    this._needToScroll = true;
    this.typing = true;
    // Agregar session_id explícitamente al payload
    const payload = {
      ...data,
      sessionId: getSessionId(),
    };
    this._chatMessageService.sendMessage(payload).subscribe({
      next: (response) => {
        if (response.ok) {
          this.messages = this.messages.map((message) => {
            if (message.temp_number === temNumber) {
              message.id = response.data.id;
              message.bot_response = response.data.bot_response;
              message.create_at = new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });
            }
            return message;
          });
          this._needToScroll = true;
        }
        this.typing = false;
      },
      error: (error) => {
        let messageResponse = '';
        if (error.status === 445) {
          messageResponse = 'Por favor intente en 5 minutos.';
        } else if (error.status === 420) {
          messageResponse = 'Not data available.';
        } else {
          messageResponse = 'Ups! Algo salió mal, por favor intente de nuevo.';
        }
        this.messages = this.messages.map((message) => {
          if (message.temp_number === temNumber) {
            message.bot_response = messageResponse;
          }
          return message;
        });
        this.typing = false;
      },
    });
  }

  senderTyping(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.askForm.valid) {
        this.sendAskSubmit();
      }
    }
  }

  pushMessage(message: IMessage) {
    this.messages.push(message);
  }

  onClose() {
    this.close.emit();
  }
}

