export function delay(ms, speed = 1, signal) {
  return new Promise((resolve, reject) => {
    const adjusted = ms / speed;
    const id = setTimeout(resolve, adjusted);
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(id);
        reject(new DOMException('Aborted', 'AbortError'));
      }, { once: true });
    }
  });
}

export function isAbortError(err) {
  return err?.name === 'AbortError';
}
