import { el } from '../utils/dom.js';

export function createChatBubble(role, text, toolCall) {
  const roleLabel = role === 'user' ? 'User' : 'Assistant';
  const children = [
    el('div', { className: 'chat-bubble__role' }, roleLabel),
    el('div', { className: 'chat-bubble__text' }, text)
  ];

  if (toolCall) {
    const argsText = typeof toolCall.arguments === 'string'
      ? toolCall.arguments
      : JSON.stringify(toolCall.arguments, null, 2);
    children.push(
      el('div', { className: 'tool-call' },
        el('div', { className: 'tool-call__label' }, 'Tool Call'),
        el('div', { className: 'tool-call__name' }, toolCall.name),
        el('div', { className: 'tool-call__args' }, argsText)
      )
    );
  }

  return el('div', { className: `chat-bubble chat-bubble--${role}` }, ...children);
}
