/**
 * Apply color-coded highlights to a text string.
 * Returns a DocumentFragment with matching substrings wrapped in <span class="highlight highlight--N">.
 */
export function applyHighlights(text, highlights) {
  if (!highlights || highlights.length === 0 || !text) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createTextNode(text || ''));
    return frag;
  }

  // Build a combined regex matching all highlight texts (longest first to avoid partial matches)
  const sorted = [...highlights].sort((a, b) => b.text.length - a.text.length);
  const escaped = sorted.map(h => h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');

  // Map text -> color for quick lookup
  const colorMap = new Map(highlights.map(h => [h.text, h.color]));

  const frag = document.createDocumentFragment();
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    // Highlighted span
    const span = document.createElement('span');
    span.className = `highlight highlight--${colorMap.get(match[1])}`;
    span.textContent = match[1];
    frag.appendChild(span);
    lastIndex = pattern.lastIndex;
  }

  // Remaining text
  if (lastIndex < text.length) {
    frag.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  return frag;
}
