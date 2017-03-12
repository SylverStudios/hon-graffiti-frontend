import { Record, List, Map } from 'immutable';

import parseRaw from './parseRaw';

import StartingStrings from '../test-resources/StartingStrings';

const startingStrings =
  Map(List(StartingStrings()).toObject()).mapEntries(entry => (
    [entry[1], new List(parseRaw(entry[1]))]
  ));

const initialState = new (Record({
  strings: startingStrings,
}))();

const reducers = {
  CREATE_STRING(state, { raw }) {
    return state.setIn(['strings', raw], new List(parseRaw(raw)));
  },
};

export default (state = initialState, action) => {
  const fn = reducers[action.type];
  return fn ? fn(state, action) : state;
};
