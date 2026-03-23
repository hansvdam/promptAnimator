import { el } from '../utils/dom.js';

export function createContextCard(type, title, content) {
  const card = el('div', { className: `context-card context-card--${type}` },
    el('div', { className: 'context-card__header', onClick: () => card.classList.toggle('context-card--collapsed') },
      el('span', { className: 'context-card__dot' }),
      el('span', { className: 'context-card__title' }, title),
      el('span', { className: 'context-card__toggle' }, '\u25BC')
    ),
    el('div', { className: 'context-card__body' },
      el('div', { className: 'context-card__content' }, formatContent(content))
    )
  );
  return card;
}

function formatContent(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.map(item => {
      if (typeof item === 'string') return item;
      return JSON.stringify(item, null, 2);
    }).join('\n');
  }
  return JSON.stringify(content, null, 2);
}
