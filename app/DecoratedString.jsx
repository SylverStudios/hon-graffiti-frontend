import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const DecoratedString = ({ segments }) => (
  <span>
    {segments.map(segment => (
      <span style={{ color: segment.color }}>{segment.content}</span>
    ))}
  </span>
);
DecoratedString.propTypes = {
  segments: ImmutablePropTypes.listOf(PropTypes.object).isRequired,
};

export default DecoratedString;
