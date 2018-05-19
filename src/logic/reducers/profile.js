// @flow
import type {Action} from "../reducers";
import * as types from "../types";

export type State = {
  name: ?string,
  age: ?number
};

const initialState: State = {
  name: undefined,
  age: undefined
};

const reducer = (state: State = initialState, action: Action) => {
  if (action.type == types.SAVE_PROFILE) {
    return {...state, ...action.payload};
  }
  return state;
};

export default reducer;
