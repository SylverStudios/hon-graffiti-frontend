import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import style from './StringInput.scss';

const connector = connect(null, {
  createString: raw => ({ type: 'CREATE_STRING', raw }),
});

class StringInput extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.createString(this.input.value);
    this.input.value = '';
  }
  render() {
    return (
      <form className={style.component} onSubmit={this.onSubmit}>
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
  createString: PropTypes.func.isRequired,
};

export default connector(StringInput);
