function randomElement(array) {
  return array[random(0, array.length - 1)];
}

function randomElements(n, array) {
  const set = new Set();
  for (let i = 0; i < n; i++) {
    let element;
    do {
      element = randomElement(array);
    } while (set.has(element));
    set.add(element);
  }
  return Array.from(set);
}

function random(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

let timeoutId;

function debounce(callback, timeoutDelay = 500) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(callback, timeoutDelay);
}

function throttle(callback, delayBetweenFrames) {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

function stringByPattern(pattern, i) {
  const leftBracket = pattern.indexOf('{');
  const rightBracket = pattern.lastIndexOf('}');
  return pattern.substring(0, leftBracket) + i + pattern.substring(rightBracket + 1, pattern.length);
}

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

export {randomElement, randomElements, random, stringByPattern, checkStringLength, throttle, debounce};
