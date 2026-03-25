import { el } from '../utils/dom.js';
import { applyHighlights } from '../utils/highlight.js';

export function createToolResultCard(content, toolName, highlights) {
  let nameEl = null;
  if (toolName) {
    nameEl = el('span', { className: 'tool-result-card__name' });
    nameEl.appendChild(applyHighlights(toolName, highlights));
  }

  return el('div', { className: 'tool-result-card' },
    el('div', { className: 'tool-result-card__header' },
      el('span', { className: 'tool-result-card__badge' }, 'Result'),
      nameEl
    ),
    (() => { const c = el('div', { className: 'tool-result-card__content' }); c.appendChild(applyHighlights(content, highlights)); return c; })()
  );
}
