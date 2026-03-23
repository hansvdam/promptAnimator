import { el } from '../utils/dom.js';
import { typewriter } from '../utils/typewriter.js';

export class InputBar {
  constructor() {
    this.textEl = el('span', { className: 'input-bar__text' });
    this.cursorEl = el('span', { className: 'input-bar__cursor input-bar__cursor--hidden' });
    this.fieldEl = el('div', { className: 'input-bar__field' }, this.textEl, this.cursorEl);
    this.el = el('div', { className: 'input-bar' }, this.fieldEl);
  }

  async type(text, speed = 1, signal) {
    this.textEl.textContent = '';
    this.cursorEl.classList.remove('input-bar__cursor--hidden');
    try {
      await typewriter(this.textEl, text, speed, signal);
    } catch (e) {
      if (e.name !== 'AbortError') throw e;
    }
  }

  clear() {
    this.textEl.textContent = '';
    this.cursorEl.classList.add('input-bar__cursor--hidden');
  }
}
