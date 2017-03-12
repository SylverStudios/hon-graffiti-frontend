import React, { Component } from 'react';
import { Map, List } from 'immutable';

import StoredStrings from './StoredStrings';
import StringInput from './StringInput';
import parseRaw from './parseRaw';

import StartingStrings from '../test-resources/StartingStrings';

const startingStrings =
  Map(List(StartingStrings()).toObject()).mapEntries(entry => (
    [entry[1], new List(parseRaw(entry[1]))]
  ));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { strings: startingStrings };
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
