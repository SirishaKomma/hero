import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages = [];
  constructor() { }

  add(message) {
    this.messages.push(message);
  }
  clear() {
    this.messages = [];
  }
}