import { expect } from 'chai';
import parseRaw from './parseRaw';

describe('parseRaw', () => {
  it('works', () => {
    expect(parseRaw('^rred^ggreen')).to.deep.equal([
      { color: 'red', content: 'red' },
      { color: 'green', content: 'green' },
    ]);
    expect(parseRaw('not colored^bbut this is blue')).to.deep.equal([
      { content: 'not colored' },
      { color: 'blue', content: 'but this is blue' },
    ]);
  });
});
