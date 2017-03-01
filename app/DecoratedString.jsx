import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const DecoratedString = ({ segments }) => (
  <span>
    {segments.map((segment, i) => (
      <span style={{ color: segment.color }} key={i}>{segment.content}</span>
    ))}
  </span>
);
DecoratedString.propTypes = {
  segments: ImmutablePropTypes.listOf(PropTypes.object).isRequired,
};

export default DecoratedString;
