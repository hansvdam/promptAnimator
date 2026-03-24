export function typewriter(textEl, text, speed = 1, signal) {
  return new Promise((resolve, reject) => {
    let i = 0;
    const baseDelay = 70;

    function tick() {
      if (signal?.aborted) {
        textEl.textContent = text;
        reject(new DOMException('Aborted', 'AbortError'));
        return;
      }
      if (i < text.length) {
        textEl.textContent += text[i];
        i++;
        setTimeout(tick, baseDelay / speed);
      } else {
        resolve();
      }
    }

    tick();
  });
}
