// @flow

import type {History} from "history";
import {combineReducers} from "redux";
import {isEmpty} from "ramda";
import * as types from "../types";
import game from "./game";
import type {State as Game} from "./game";
import profile from "./profile";
import type {State as Profile} from "./profile";

export type Action = {
  type: string,
  payload?: any
};
export type State = {
  history?: History,
  game: Game,
  profile: Profile
};

const history = (state: History = null, action: Action) => {
  if (action.type == types.ADD_HISTORY) {
    return action.payload;
  }
  return state;
};

const reducer = combineReducers({
  profile,
  game,
  history
});
export default (state: State, action: Action) => {
  if (action.type == types.REDUX_HYDRATE && action.payload) {
    if (!isEmpty(action.payload)) return {...state, ...action.payload};
    else return state;
  } else return reducer(state, action);
};
