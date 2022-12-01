function randomArrayElement(array) {
  return array[random(0, array.length - 1)];
}

function random(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function stringByPattern(pattern, i) {
  const leftBracket = pattern.indexOf('{');
  const rightBracket = pattern.lastIndexOf('}');
  return pattern.substring(0, leftBracket) + i + pattern.substring(rightBracket + 1, pattern.length);
}

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

export {randomArrayElement, random, stringByPattern, checkStringLength};
