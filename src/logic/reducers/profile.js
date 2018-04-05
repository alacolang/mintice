// @flow
import type {Action} from "redux";

export type State = {
  name: string,
  age?: number
};

const initialState: State = {
  name: "Yasser"
};

const reducer = (state: State = initialState, action: Action) => {
  return state;
};

export default reducer;
