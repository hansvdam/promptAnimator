import { el } from '../utils/dom.js';

export function createTypingIndicator() {
  return el('div', { className: 'typing-indicator' },
    el('div', { className: 'typing-indicator__dots' },
      el('span', { className: 'typing-indicator__dot' }),
      el('span', { className: 'typing-indicator__dot' }),
      el('span', { className: 'typing-indicator__dot' })
    )
  );
}
