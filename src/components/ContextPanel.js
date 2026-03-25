import { el } from '../utils/dom.js';
import { createContextCard } from './ContextCard.js';

export class ContextPanel {
  constructor() {
    this.el = el('div', { className: 'context-panel' });
    this.cards = [];
  }

  clear() {
    this.el.innerHTML = '';
    this.cards = [];
  }

  addCard(type, title, content, delayMs = 0, highlights = null) {
    const card = createContextCard(type, title, content, highlights);
    this.el.appendChild(card);
    this.cards.push(card);

    return new Promise(resolve => {
      setTimeout(() => {
        card.classList.add('context-card--visible');
        setTimeout(resolve, 500);
      }, delayMs);
    });
  }

  addSectionLabel(text) {
    this.el.appendChild(el('div', { className: 'context-panel__label' }, text));
  }
}
