import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import style from './StringInput.scss';

const connector = connect(null, {
  createString: raw => ({ type: 'CREATE_STRING', raw }),
});

class StringInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
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
    this.setState({ value: this.input.value });
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
            {this.state.value}
          </span>
          <br />
        </pre>
        <textarea
          ref={(c) => { this.input = c; }}
          className={style.input}
          value={this.state.value}
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
};

export default connector(StringInput);
