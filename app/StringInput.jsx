import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import style from './StringInput.scss';

const connector = connect(({ newString }) => (
  { newString }
), {
  createString: raw => ({ type: 'CREATE_STRING', raw }),
  updateNewString: newString => ({ type: 'UPDATE_NEW_STRING', newString }),
});

class StringInput extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  onSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.createString(this.input.value);
    this.input.value = '';
  }
  onChange() {
    const newString = this.input.value;
    this.props.updateNewString(newString);
  }
  onKeyDown(e) {
    if (e.keyCode === 13 && e.metaKey) {
      e.preventDefault();
      this.onSubmit();
    }
  }
  render() {
    return (
      <form className={style.component} onSubmit={this.onSubmit}>
        <pre className={style.mirrorElement}>
          <span
            className={style.mirrorElementContent}
          >
            {this.props.newString}
          </span>
          <br />
        </pre>
        <textarea
          ref={(c) => { this.input = c; }}
          className={style.input}
          value={this.props.newString}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          placeholder="Enter a string"
        />
      </form>
    );
  }
}
StringInput.propTypes = {
  createString: PropTypes.func.isRequired,
  newString: PropTypes.string.isRequired,
  updateNewString: PropTypes.func.isRequired,
};

export default connector(StringInput);
