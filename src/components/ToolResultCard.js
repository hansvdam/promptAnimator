import { el } from '../utils/dom.js';

export function createToolResultCard(content, toolName) {
  return el('div', { className: 'tool-result-card' },
    el('div', { className: 'tool-result-card__header' },
      el('span', { className: 'tool-result-card__badge' }, 'Result'),
      toolName ? el('span', { className: 'tool-result-card__name' }, toolName) : null
    ),
    el('div', { className: 'tool-result-card__content' }, content)
  );
}
