import React, { Component, PropTypes } from 'react';
import style from './StringInput.scss';

export default class StringInput extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.input.value);
    this.input.value = '';
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          ref={(c) => { this.input = c; }}
          type="text"
          className={style.input}
          placeholder="Enter a string"
        />
        <input type="submit" className={style.submit} value="Submit" />
      </form>
    );
  }
}
StringInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
