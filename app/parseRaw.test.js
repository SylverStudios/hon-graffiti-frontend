import { expect } from 'chai';
import { List } from 'immutable';
import parseRaw from './parseRaw';

describe('parseRaw', () => {
  it('recognizes all color characters, lowercase or uppercase', () => {
    const colorChars = new List(['w', 'r', 'b', 'y', 'm', 'n', 'p', 'k', 'o', 't', 'v', 'g']);
    colorChars.forEach((c) => {
      expect(parseRaw(`^${c}`)[0].content).to.equal('');
      expect(parseRaw(`^${c}`)[0].color).to.not.equal(undefined);
      expect(parseRaw(`^${c.toUpperCase()}`)[0].content).to.equal('');
      expect(parseRaw(`^${c.toUpperCase()}`)[0].color).to.not.equal(undefined);
    });
  });
  it('parses two colored segments', () => {
    expect(parseRaw('^rred^ggreen')).to.deep.equal([
      { color: 'red', content: 'red' },
      { color: 'green', content: 'green' },
    ]);
  });
  it('parses one uncolored segment followed by a colored segment', () => {
    expect(parseRaw('not colored^bbut this is blue')).to.deep.equal([
      { content: 'not colored' },
      { color: 'blue', content: 'but this is blue' },
    ]);
  });
  it('leaves an unfollowed ^ symbol in the content', () => {
    expect(parseRaw('^r^')[0].content).to.equal('^');
  });
  it('leaves two unfollowed ^ symbols in the content', () => {
    expect(parseRaw('^r^^')[0].content).to.equal('^^');
  });
  it('leaves the ^ and following character in the content if they do not map to a color', () => {
    expect(parseRaw('^r^z')[0].content).to.equal('^z');
  });
  it('returns one segment with empty string content if input is only a color token', () => {
    expect(parseRaw('^r')).to.deep.equal([
      { color: 'red', content: '' },
    ]);
  });
  it('handles dangling color token', () => {
    expect(parseRaw('hello^r')).to.deep.equal([
      { content: 'hello' },
      { color: 'red', content: '' },
    ]);
  });
  it('handles non-token caret followed by color token', () => {
    expect(parseRaw('^^r')).to.deep.equal([
      { content: '^' },
      { color: 'red', content: '' },
    ]);
  });
});
