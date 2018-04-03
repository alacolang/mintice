// @flow

import * as types from "./types";

type Session = {
  id: string,
  start: Date,
  finish?: Date,
  blocks: string[]
};
type Block = {
  id: string,
  completed: boolean,
  start: Date,
  finish?: Date,
  trials: string[]
};
type Trial = {
  id: string,
  start: Date,
  delay: number,
  category: $Keys<typeof types.Category>,
  rt?: number,
  response?: $Keys<typeof types.RESPONSE_TYPE>,
};
type Metrics = {
  lastDelay: number,
  sessionID: string,
  blockID: string,
  trialID: string,
  lastActivity?: Date
};
type Profile = {
  name: string,
  age: number
};
type State = {
  history?: History,
  metrics: Metrics,
  sessions: {[string]: Session},
  blocks: {[string]: Block},
  trials: {[string]: Trial},
  // profile: Profile
};

const initialState: State = {
  metrics: {
    lastDelay: 100,
    sessionID: "1",
    blockID: "1",
    trialID: "1"
  },
  sessions: {
    "1": {
      id: "1",
      start: new Date(),
      blocks: []
    }
  },
  blocks: {
    "1": {
      id: "1",
      completed: false,
      start: new Date(),
      trials: []
    }
  },
  trials: {
    "1": {
      id: "1",
      starts: new  Date(),
      delay: 301,
      categories: types.Category.GO,
    }
  },
  profile: {
  //   name: undefined,
  //   age: undefined
  }
};

const reducer = (state = initialState, action) => {
  if (action.type == types.ADD_HISTORY) {
    return {...state, history: action.payload};
  } else if (action.type == types.TRIAL_RESULT) {
    const {rt} = action.payload;
    const {sessionID, blockID, trialID} = this.state.metrics;
    const trial = state.trials[trialID];
    let response = undefined;
    if (trial.category == "go") {
      response =
        trial.delay > rt
          ? types.RESPONSE_TYPE.SUCCESS
          : types.RESPONSE_TYPE.OMISSION;
    } else if (trial.category == "nogo") {
      response =
        trial.delay > rt
          ? types.RESPONSE_TYPE.COMISSION
          : types.RESPONSE_TYPE.SUCCESS;
    }
    return {
      ...state,
      trials: {
        ...trials,
        [trialID]: {
          ...trials[trialID],
          response,
          rt
        }
      }
    };
  }
};

export default reducer;
