import { el } from '../utils/dom.js';
import { applyHighlights } from '../utils/highlight.js';

export function createChatBubble(role, text, toolCall, highlights) {
  const roleLabel = role === 'user' ? 'User' : 'Assistant';
  const children = [
    el('div', { className: 'chat-bubble__role' }, roleLabel),
    (() => { const t = el('div', { className: 'chat-bubble__text' }); t.appendChild(applyHighlights(text, highlights)); return t; })()
  ];

  if (toolCall) {
    const argsText = typeof toolCall.arguments === 'string'
      ? toolCall.arguments
      : JSON.stringify(toolCall.arguments, null, 2);

    const nameEl = el('div', { className: 'tool-call__name' });
    nameEl.appendChild(applyHighlights(toolCall.name, highlights));

    const argsEl = el('div', { className: 'tool-call__args' });
    argsEl.appendChild(applyHighlights(argsText, highlights));

    children.push(
      el('div', { className: 'tool-call' },
        el('div', { className: 'tool-call__label' }, 'Tool Call'),
        nameEl,
        argsEl
      )
    );
  }

  return el('div', { className: `chat-bubble chat-bubble--${role}` }, ...children);
}
