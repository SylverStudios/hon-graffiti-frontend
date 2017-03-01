import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const DecoratedString = ({ segments }) => (
  <span>{segments.map(segment => segment.content)}</span>
);
DecoratedString.propTypes = {
  segments: ImmutablePropTypes.listOf(PropTypes.object).isRequired,
};

export default DecoratedString;
