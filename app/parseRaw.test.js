import { expect } from 'chai';
import { Map, List } from 'immutable';
import parseRaw, { colorChars } from './parseRaw';

describe('parseRaw', () => {
  it('recognizes all color characters, lowercase or uppercase', () => {
    const colorCharList = new List(['w', 'r', 'b', 'y', 'm', 'n', 'p', 'k', 'o', 't', 'v', 'g']);
    colorCharList.forEach((c) => {
      expect(parseRaw(`^${c}`)[0].content).to.equal('');
      expect(parseRaw(`^${c}`)[0].color).to.not.equal(undefined);
      expect(parseRaw(`^${c.toUpperCase()}`)[0].content).to.equal('');
      expect(parseRaw(`^${c.toUpperCase()}`)[0].color).to.not.equal(undefined);
    });
  });
  it('recognizes digit string tokens', () => {
    const testDigitStrings = new Map({
      '000': '#000000',
      '555': '#8C8C8C',
      '999': '#FFFFFF',
      '123': '#1C3854',
      '456': '#708CA8',
      '789': '#C4E0FF',
      '987': '#FFE0C4',
      '654': '#A88C70',
      '321': '#54381C',
      '100': '#1C0000',
      '010': '#001C00',
      '001': '#00001C',
    });
    testDigitStrings.forEach((colorValue, digitString) => {
      expect(parseRaw(`^${digitString}`)[0].color).to.equal(colorValue);
      expect(parseRaw(`^${digitString}`)[0].content).to.equal('');
    });
  });
  it('parses two colored char token segments', () => {
    expect(parseRaw('^rred^ggreen')).to.deep.equal([
      { color: colorChars.r, content: 'red' },
      { color: colorChars.g, content: 'green' },
    ]);
  });
  it('parses two color digit string token segments', () => {
    expect(parseRaw('^123first^321second')).to.deep.equal([
      { color: '#1C3854', content: 'first' },
      { color: '#54381C', content: 'second' },
    ]);
  });
  it('parses one uncolored segment followed by a colored char token segment', () => {
    expect(parseRaw('not colored^bbut this is blue')).to.deep.equal([
      { content: 'not colored' },
      { color: colorChars.b, content: 'but this is blue' },
    ]);
  });
  it('parses one uncolored segment followed by a digit string token segment', () => {
    expect(parseRaw('not colored^123but this is colored')).to.deep.equal([
      { content: 'not colored' },
      { color: '#1C3854', content: 'but this is colored' },
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
  it('returns one segment with empty string content if input is only a char color token', () => {
    expect(parseRaw('^r')).to.deep.equal([
      { color: colorChars.r, content: '' },
    ]);
  });
  it('handles dangling char token', () => {
    expect(parseRaw('hello^r')).to.deep.equal([
      { content: 'hello' },
      { color: colorChars.r, content: '' },
    ]);
  });
  it('handles non-token caret followed by char token', () => {
    expect(parseRaw('^^r')).to.deep.equal([
      { content: '^' },
      { color: colorChars.r, content: '' },
    ]);
  });
  it('leaves ^12t in the content (incomplete digit string)', () => {
    expect(parseRaw('^r^12t')).to.deep.equal([
      { color: colorChars.r, content: '^12t' },
    ]);
  });
});
