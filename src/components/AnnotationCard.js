import { el } from '../utils/dom.js';

export function createAnnotationCard(content, tag) {
  return el('div', { className: 'annotation-card' },
    el('div', { className: 'annotation-card__badge' }, tag || 'Agent'),
    el('div', { className: 'annotation-card__content' }, content)
  );
}
