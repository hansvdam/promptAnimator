import { el } from '../utils/dom.js';
import { Toolbar } from './Toolbar.js';
import { ContextPanel } from './ContextPanel.js';
import { ChatPanel } from './ChatPanel.js';
import { AnimationEngine } from '../engine/AnimationEngine.js';
import { configs } from '../configs/index.js';

export class App {
  constructor(root) {
    this.root = root;
    this.contextPanel = new ContextPanel();
    this.chatPanel = new ChatPanel();
    this.engine = new AnimationEngine(this.contextPanel, this.chatPanel);

    this.toolbar = new Toolbar({
      configs,
      onConfigChange: (i) => this.loadConfig(i),
      onPlay: () => this.engine.play(),
      onPause: () => this.engine.pause(),
      onReset: () => { this.engine.reset(); this.toolbar.setPlaying(false); this.loadConfig(this.currentConfigIndex); },
      onSpeedChange: (s) => this.engine.setSpeed(s),
      onModeToggle: (m) => this.engine.setManual(m),
    });

    this.engine.onStateChange = (state) => {
      if (state === 'finished' || state === 'paused' || state === 'idle') {
        this.toolbar.setPlaying(false);
      }
    };

    const layout = el('div', { className: 'main-layout' },
      this.contextPanel.el,
      this.chatPanel.el
    );

    this.root.appendChild(this.toolbar.el);
    this.root.appendChild(layout);

    this.currentConfigIndex = 0;
    this.loadConfig(0);
    this._setupKeyboard();
  }

  loadConfig(index) {
    this.currentConfigIndex = index;
    this.engine.load(configs[index]);
  }

  _setupKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (this.engine.state === 'playing') {
          this.engine.pause();
        } else {
          if (this.engine.manual) {
            this.engine.stepForward();
          } else {
            this.engine.play();
          }
        }
      } else if (e.code === 'Escape') {
        this.engine.reset();
        this.toolbar.setPlaying(false);
        this.loadConfig(this.currentConfigIndex);
      }
    });
  }
}
