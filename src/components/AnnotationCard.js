import { el } from '../utils/dom.js';

export function createAnnotationCard(content) {
  return el('div', { className: 'annotation-card' },
    el('div', { className: 'annotation-card__badge' }, 'Agent'),
    el('div', { className: 'annotation-card__content' }, content)
  );
}
