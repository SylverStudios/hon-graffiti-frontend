import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import DecoratedString from './DecoratedString';

const StoredStrings = ({ strings }) => (
  <div>
    {strings.map((decorated, raw) => (
      <div key={raw}>{raw}: <DecoratedString segments={decorated} /></div>
    )).toArray()}
  </div>
);
StoredStrings.propTypes = {
  strings: ImmutablePropTypes.mapOf(ImmutablePropTypes.list).isRequired,
};

export default StoredStrings;
