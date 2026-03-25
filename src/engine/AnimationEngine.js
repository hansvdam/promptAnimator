import { buildSteps } from './StepQueue.js';
import { delay, isAbortError } from './Timing.js';

export class AnimationEngine {
  constructor(contextPanel, chatPanel) {
    this.contextPanel = contextPanel;
    this.chatPanel = chatPanel;
    this.steps = [];
    this.currentIndex = 0;
    this.state = 'idle'; // idle | playing | paused | finished
    this.speed = 1;
    this.manual = false;
    this.abortController = null;
    this.onStateChange = null;
    this._stepResolve = null; // for manual mode
  }

  load(config) {
    this.reset();
    this.steps = buildSteps(config);
    this.currentIndex = 0;
    this.state = 'idle';
    this._notify();
  }

  reset() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    this.contextPanel.clear();
    this.chatPanel.clear();
    this.steps = [];
    this.currentIndex = 0;
    this.state = 'idle';
    this._stepResolve = null;
    this._notify();
  }

  async play() {
    if (this.state === 'playing') return;
    if (this.state === 'finished') {
      this.contextPanel.clear();
      this.chatPanel.clear();
      this.currentIndex = 0;
    }

    this.state = 'playing';
    this.abortController = new AbortController();
    this._notify();

    try {
      await this._runLoop();
    } catch (e) {
      if (!isAbortError(e)) throw e;
    }
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    this._notify();
  }

  async stepForward() {
    if (this.currentIndex >= this.steps.length) return;
    if (this.state === 'finished') {
      this.contextPanel.clear();
      this.chatPanel.clear();
      this.currentIndex = 0;
    }

    this.state = 'playing';
    this.abortController = new AbortController();
    this._notify();

    try {
      await this._executeStep(this.steps[this.currentIndex]);
      this.currentIndex++;
      if (this.currentIndex >= this.steps.length) {
        this.state = 'finished';
      } else {
        this.state = 'paused';
      }
    } catch (e) {
      if (!isAbortError(e)) throw e;
    }

    this._notify();
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setManual(manual) {
    this.manual = manual;
  }

  async _runLoop() {
    const signal = this.abortController?.signal;

    while (this.currentIndex < this.steps.length && this.state === 'playing') {
      const step = this.steps[this.currentIndex];
      await this._executeStep(step);
      this.currentIndex++;

      if (this.manual && this.currentIndex < this.steps.length) {
        // Wait for next stepForward call
        this.state = 'paused';
        this._notify();
        return;
      }
    }

    if (this.currentIndex >= this.steps.length) {
      this.state = 'finished';
      this._notify();
    }
  }

  async _executeStep(step) {
    const signal = this.abortController?.signal;
    const speed = this.speed;

    switch (step.type) {
      case 'show-context-card':
        await this.contextPanel.addCard(step.cardType, step.title, step.content, 0, step.highlights);
        break;

      case 'pause-beat':
        await delay(600, speed, signal);
        break;

      case 'user-message':
        await this.chatPanel.showUserMessage(step.content, speed, signal);
        break;

      case 'assistant-message':
        await this.chatPanel.showAssistantMessage(step.content, step.tool_call, speed, signal, step.highlights);
        break;

      case 'tool-result':
        await this.chatPanel.showToolResult(step.content, step.tool_name, speed, signal, step.highlights);
        break;

      case 'annotation':
        await this.chatPanel.showAnnotation(step.content, speed, signal, step.tag);
        break;
    }
  }

  _notify() {
    if (this.onStateChange) this.onStateChange(this.state);
  }
}
