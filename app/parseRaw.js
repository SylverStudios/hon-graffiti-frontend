const colorChars = {
  r: 'red',
  y: 'yellow',
  g: 'green',
  b: 'blue',
  o: 'orange',
  p: 'purple',
};

function consumeSegment(raw) {
  const nextTokenIndex = raw.indexOf('^');
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
  const tokenAfterIndex = raw.substring(2).indexOf('^');
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
