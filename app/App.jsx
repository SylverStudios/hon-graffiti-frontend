import React, { Component } from 'react';
import { Map, List } from 'immutable';

import StoredStrings from './StoredStrings';
import StringInput from './StringInput';
import parseRaw from './parseRaw';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { strings: new Map() };
    this.addString = this.addString.bind(this);
  }

  addString(raw) {
    const strings = this.state.strings.set(raw, new List(parseRaw(raw)));
    this.setState({ strings });
  }

  render() {
    return (
      <div>
        Hon graffiti frontend <br />
        <StoredStrings strings={this.state.strings} />
        <StringInput onSubmit={this.addString} />
      </div>
    );
  }
}

export default App;
