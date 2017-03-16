const colorChars = {
  r: 'red',
  y: 'yellow',
  g: 'green',
  b: 'blue',
  o: 'orange',
  p: 'purple',
};

function getNextTokenIndex(raw) {
  const nextCaret = raw.indexOf('^');
  if (nextCaret === -1) { // no carets, no tokens
    return -1;
  }
  if (nextCaret === raw.length - 1) { // caret is at end of string, not a token
    return -1;
  }
  if (Object.prototype.hasOwnProperty.call(colorChars, raw.charAt(nextCaret + 1))) {
    // caret is followed by valid color character, is a token
    return nextCaret;
  }
  // found caret is non token, recursively find next token with remaining length of raw
  const remainingNextCaret = getNextTokenIndex(raw.substring(nextCaret + 1));
  if (remainingNextCaret === -1) { // no other token in raw
    return -1;
  }
  return nextCaret + remainingNextCaret;
}

function consumeSegment(raw) {
  const nextTokenIndex = getNextTokenIndex(raw);
  if (nextTokenIndex === -1) { // no more tokens
    return {
      segment: { content: raw },
      remaining: false, // we're done
    };
  }
  if (nextTokenIndex !== 0) { // token isn't at the front
    return {
      segment: { content: raw.substring(0, nextTokenIndex) },
      remaining: raw.substring(nextTokenIndex),
    };
  }
  const token = raw.substring(0, 2);
  const tokenAfterIndex = getNextTokenIndex(raw.substring(2));
  const color = colorChars[token.charAt(1)];
  const content = tokenAfterIndex === -1
  ? raw.substring(2)
  : raw.substring(2, tokenAfterIndex + 2);
  const remaining = tokenAfterIndex === -1
  ? false
  : raw.substring(tokenAfterIndex + 2);
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
