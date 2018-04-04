// @flow

import * as types from "./types";
import type {Category, Response} from "./types";
import type {Action} from "redux";
import produce from "immer";

export type Session = {
  id: string,
  completed: boolean,
  startedAt: Date,
  finishedAt?: Date,
  blocks: string[]
};
export type Block = {
  id: string,
  completed: boolean,
  startedAt: Date,
  finishedAt?: Date,
  trials: string[]
};
export type Trial = {
  id: string,
  startedAt: Date,
  delay: number,
  category: Category,
  rt?: number,
  response?: Response
};
export type Metrics = {
  lastDelay: number,
  sessionID?: string,
  blockID?: string,
  trialID?: string,
  lastActivity?: Date
};

export type State = {
  metrics: Metrics,
  sessions: {[string]: Session},
  blocks: {[string]: Block},
  trials: {[string]: Trial}
};

const initialState: State = {
  metrics: {
    lastDelay: 300
    // sessionID: "0",
    // blockID: "0",
    // trialID: "0"
  },
  sessions: {
    // "1": {
    //   id: "1",
    //   completed: false,
    //   startedAt: new Date(),
    //   blocks: []
    // }
  },
  blocks: {
    // "1": {
    //   id: "1",
    //   completed: false,
    //   startedAt: new Date(),
    //   trials: []
    // }
  },
  trials: {
    // "1": {
    //   id: "1",
    //   startedAt: new Date(),
    //   delay: 301,
    //   category: types.CATEGORY.GO
    // }
  }
};

const reducer = (state: State = initialState, action: Action) =>
  produce((state: State), (draft: State): void => {
    if (action.type == types.SESSION_START) {
      const sessionID = ((+state.metrics.sessionID || 0) + 1).toString();
      draft.metrics.sessionID = sessionID;
      draft.sessions[sessionID] = {
        id: sessionID,
        completed: false,
        startedAt: action.payload.startedAt,
        blocks: []
      };
    } else if (action.type == types.BLOCK_START) {
      const blockID = ((+state.metrics.blockID || 0) + 1).toString();
      draft.metrics.blockID = blockID;
      draft.sessions[draft.metrics.sessionID].blocks.push(blockID);
      draft.blocks[blockID] = {
        id: blockID,
        completed: false,
        startedAt: action.payload.startedAt,
        trials: []
      };
    } else if (action.type == types.TRIAL_START) {
      const trialID = ((+state.metrics.trialID || 0) + 1).toString();
      draft.metrics.trialID = trialID;
      draft.blocks[draft.metrics.blockID].trials.push(trialID);
      draft.trials[trialID] = {
        id: trialID,
        ...action.payload
      };
    } else if (action.type == types.TRIAL_RESULT) {
      const {rt} = action.payload;
      const {sessionID, blockID, trialID} = state.metrics;
      const trial = state.trials[trialID];
      let response = undefined;
      if (trial.category == types.CATEGORY.GO) {
        response =
          trial.delay > rt
            ? types.RESPONSE_TYPE.SUCCESS
            : types.RESPONSE_TYPE.OMISSION;
      } else if (trial.category == types.CATEGORY.NO_GO) {
        response =
          trial.delay > rt
            ? types.RESPONSE_TYPE.COMISSION
            : types.RESPONSE_TYPE.SUCCESS;
      }
      draft.trials[trialID].response = response;
      draft.trials[trialID].rt = rt;
    }
  });

export default reducer;
