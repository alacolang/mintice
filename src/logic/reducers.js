// @flow

import type {Action} from "redux";
import type {History} from "history";
import {combineReducers} from "redux";
import * as types from "./types";
import game from "./gameReducer";
import type {State as Game} from "./gameReducer";
import profile from "./profileReducer";
import type {State as Profile} from "./profileReducer";

type State = {
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
export default reducer;
