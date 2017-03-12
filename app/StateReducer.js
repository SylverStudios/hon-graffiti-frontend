import { Record, List, Map } from 'immutable';

import parseRaw from './parseRaw';

import StartingStrings from '../test-resources/StartingStrings';

const startingStrings =
  Map(List(StartingStrings()).toObject()).mapEntries(entry => (
    [entry[1], new List(parseRaw(entry[1]))]
  ));

const initialState = new (Record({
  strings: startingStrings,
  newString: '', // string in process of being created
}))();

const reducers = {
  CREATE_STRING(state) {
    const raw = state.newString;
    return state.setIn(['strings', raw], new List(parseRaw(raw)))
      .set('newString', '');
  },
  UPDATE_NEW_STRING(state, { newString }) {
    return state.merge({ newString });
  },
};

export default (state = initialState, action) => {
  const fn = reducers[action.type];
  return fn ? fn(state, action) : state;
};
