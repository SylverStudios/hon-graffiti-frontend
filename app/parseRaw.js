import { Record } from 'immutable';

// uppercase color chars map to same color
// TODO get actual color values (if different) directly from hon
export const colorChars = new (Record({
  w: '#FFFFFF',
  r: '#FF2000',
  b: '#0034FE',
  y: '#FFFC1D',
  m: '#FF3BFE',
  n: '#A5312D',
  p: '#7F1D7E',
  k: '#000000',
  o: '#FFA308',
  t: '#007E7F',
  v: '#7F7F7F',
  g: '#027D09',
}))();

function getColorFromChar(c) {
  return colorChars[c.toLowerCase()];
}

function isColorChar(c) {
  return colorChars.has(c.toLowerCase());
}

export const digitColorValues = new (Record({
  '0': '00',
  '1': '1C',
  '2': '38',
  '3': '54',
  '4': '70',
  '5': '8C',
  '6': 'A8',
  '7': 'C4',
  '8': 'E0',
  '9': 'FF',
}))();

function getColorFromDigitString(digitString) {
  let colorValue = '#';
  for (const digit of digitString) {
    colorValue += digitColorValues[digit];
  }
  return colorValue;
}

function isColorDigitString(potential) {
  if (potential.length !== 3) {
    return false;
  }
  for (const digit of potential) {
    if (isNaN(parseInt(digit, 10))) {
      return false;
    }
  }
  return true;
}

function getColorFromToken(token) {
  if (token.length === 2) { // eg. ^r
    return getColorFromChar(token.charAt(1));
  }
  return getColorFromDigitString(token.substring(1));
}

function getNextToken(raw) {
  const nextCaret = raw.indexOf('^');
  if (nextCaret === -1) { // no carets, no tokens
    return undefined;
  }
  if (nextCaret === raw.length - 1) { // caret is at end of string, not a token
    return undefined;
  }
  if (isColorChar(raw.charAt(nextCaret + 1))) {
    // caret is followed by valid color character, is a token
    return raw.substring(nextCaret, nextCaret + 2);
  }
  const isTokenOfDigitString = nextCaret + 3 < raw.length
    && isColorDigitString(raw.substring(nextCaret + 1, nextCaret + 4));
  if (isTokenOfDigitString) {
    return raw.substring(nextCaret, nextCaret + 4);
  }
  return getNextToken(raw.substring(nextCaret + 1));
}

function consumeSegment(raw) {
  const nextToken = getNextToken(raw);
  if (!nextToken) { // no more tokens
    return {
      segment: { content: raw },
      remaining: false, // we're done
    };
  }
  const nextTokenIndex = raw.indexOf(nextToken);
  if (nextTokenIndex !== 0) { // token isn't at the front
    return {
      segment: { content: raw.substring(0, nextTokenIndex) },
      remaining: raw.substring(nextTokenIndex),
    };
  }
  const color = getColorFromToken(nextToken);
  const tokenAfterNext = getNextToken(raw.substring(nextToken.length));
  const indexOfTokenAfterNext = tokenAfterNext
    ? raw.indexOf(tokenAfterNext)
    : -1;
  const content = tokenAfterNext
    ? raw.substring(nextToken.length, indexOfTokenAfterNext)
    : raw.substring(nextToken.length);
  const remaining = tokenAfterNext
    ? raw.substring(indexOfTokenAfterNext)
    : false;
  return {
    segment: { color, content },
    remaining,
  };
}

export default function parseRaw(raw) {
  const segments = [];
  let remaining = raw;
  while (remaining) {
    const next = consumeSegment(remaining);
    segments.push(next.segment);
    remaining = next.remaining;
  }
  return segments;
}
