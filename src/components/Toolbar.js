import { el } from '../utils/dom.js';

export class Toolbar {
  constructor({ configs, onConfigChange, onPlay, onPause, onReset, onSpeedChange, onModeToggle }) {
    this.state = { playing: false, speed: 1, manual: true };
    this.callbacks = { onConfigChange, onPlay, onPause, onReset, onSpeedChange, onModeToggle };

    // Config selector
    this.selectEl = el('select', { className: 'toolbar__select' });
    configs.forEach((cfg, i) => {
      this.selectEl.appendChild(el('option', { value: String(i) }, cfg.title));
    });
    this.selectEl.addEventListener('change', () => onConfigChange(parseInt(this.selectEl.value)));

    // Play/Pause
    this.playBtn = el('button', { className: 'toolbar__btn toolbar__btn--play', onClick: () => this.togglePlay() }, '\u25B6 Play');

    // Speed buttons
    this.speedBtns = [1, 1.5, 2].map(s => {
      const btn = el('button', {
        className: `toolbar__btn ${s === 1 ? 'toolbar__btn--active' : ''}`,
        onClick: () => this.setSpeed(s)
      }, `${s}x`);
      btn._speed = s;
      return btn;
    });

    // Reset
    this.resetBtn = el('button', { className: 'toolbar__btn toolbar__btn--reset', onClick: () => onReset() }, '\u21BB Reset');

    // Mode toggle
    this.modeBtn = el('button', { className: 'toolbar__btn toolbar__btn--active', onClick: () => this.toggleMode() }, 'Manual');

    this.el = el('div', { className: 'toolbar' },
      el('span', { className: 'toolbar__title' }, 'Prompt Animator'),
      el('div', { className: 'toolbar__separator' }),
      this.selectEl,
      el('div', { className: 'toolbar__separator' }),
      this.playBtn,
      el('div', { className: 'toolbar__speed-group' }, ...this.speedBtns),
      this.resetBtn,
      el('div', { className: 'toolbar__separator' }),
      this.modeBtn,
      el('span', { className: 'toolbar__hint' }, 'Space: step \u2022 Esc: reset')
    );
  }

  togglePlay() {
    this.state.playing = !this.state.playing;
    if (this.state.playing) {
      this.playBtn.textContent = '\u23F8 Pause';
      this.callbacks.onPlay();
    } else {
      this.playBtn.textContent = '\u25B6 Play';
      this.callbacks.onPause();
    }
  }

  setPlaying(playing) {
    this.state.playing = playing;
    this.playBtn.textContent = playing ? '\u23F8 Pause' : '\u25B6 Play';
  }

  setSpeed(speed) {
    this.state.speed = speed;
    this.speedBtns.forEach(btn => {
      btn.classList.toggle('toolbar__btn--active', btn._speed === speed);
    });
    this.callbacks.onSpeedChange(speed);
  }

  toggleMode() {
    this.state.manual = !this.state.manual;
    this.modeBtn.textContent = this.state.manual ? 'Manual' : 'Auto';
    this.modeBtn.classList.toggle('toolbar__btn--active', this.state.manual);
    this.callbacks.onModeToggle(this.state.manual);
  }
}
