import { el } from '../utils/dom.js';
import { createChatBubble } from './ChatBubble.js';
import { createToolResultCard } from './ToolResultCard.js';
import { createAnnotationCard } from './AnnotationCard.js';
import { createTypingIndicator } from './TypingIndicator.js';
import { InputBar } from './InputBar.js';
import { delay, isAbortError } from '../engine/Timing.js';

export class ChatPanel {
  constructor() {
    this.messagesEl = el('div', { className: 'chat-panel__messages' });
    this.inputBar = new InputBar();
    this.el = el('div', { className: 'chat-panel' }, this.messagesEl, this.inputBar.el);
  }

  clear() {
    this.messagesEl.innerHTML = '';
    this.inputBar.clear();
  }

  scrollToBottom() {
    this.messagesEl.scrollTo({ top: this.messagesEl.scrollHeight, behavior: 'smooth' });
  }

  async showUserMessage(text, speed = 1, signal) {
    // Type in input bar
    await this.inputBar.type(text, speed, signal);
    await delay(300, speed, signal);

    // Clear input and show bubble
    this.inputBar.clear();
    const bubble = createChatBubble('user', text);
    this.messagesEl.appendChild(bubble);
    this.scrollToBottom();

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => bubble.classList.add('chat-bubble--visible'));
    });
    await delay(400, speed, signal);
  }

  async showAssistantMessage(text, toolCall, speed = 1, signal, highlights = null) {
    // Show typing indicator
    const indicator = createTypingIndicator();
    this.messagesEl.appendChild(indicator);
    this.scrollToBottom();
    await delay(800, speed, signal);

    // Replace with bubble
    indicator.remove();
    const bubble = createChatBubble('assistant', text, toolCall, highlights);
    this.messagesEl.appendChild(bubble);
    this.scrollToBottom();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => bubble.classList.add('chat-bubble--visible'));
    });
    await delay(400, speed, signal);
  }

  async showAnnotation(content, speed = 1, signal, tag) {
    const card = createAnnotationCard(content, tag);
    this.messagesEl.appendChild(card);
    this.scrollToBottom();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => card.classList.add('annotation-card--visible'));
    });
    await delay(600, speed, signal);
  }

  async showToolResult(content, toolName, speed = 1, signal, highlights = null) {
    const card = createToolResultCard(content, toolName, highlights);
    this.messagesEl.appendChild(card);
    this.scrollToBottom();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => card.classList.add('tool-result-card--visible'));
    });
    await delay(600, speed, signal);
  }
}
