// eslint-disable-next-line no-unused-vars
function random(min, max) {
  if (min > max) {
    return null;
  }
  return Math.floor(Math.random() * (max - min) + min) + 1;
}

// eslint-disable-next-line no-unused-vars
function checkString(string, maxLength) {
  return String(string).length <= maxLength;
}
