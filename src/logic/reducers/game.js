// @flow

import {values} from "ramda";
import * as types from "../types";
import Games, {CATEGORY, RESPONSE} from "../games";
import type {Category, Response, IGame} from "../games";
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
  gameID: string,
  completed: boolean,
  startedAt?: Date,
  finishedAt?: Date,
  trials: string[]
};
export type Trial = {
  id: string,
  startedAt: Date,
  length: number,
  category: Category,
  rt?: number,
  response?: Response
};
export type Metrics = {
  lastLength: number,
  sessionID?: string,
  blockID?: string,
  trialID?: string,
  lastActivity?: Date,
  gameID: string
};

export type State = {
  metrics: Metrics,
  sessions: {[string]: Session},
  blocks: {[string]: Block},
  trials: {[string]: Trial}
};

const initialState: State = {
  metrics: {
    lastLength: 300
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
    //   length: 301,
    //   category: types.CATEGORY.GO
    // }
  }
};

const reducer = (state: State = initialState, action: Action) =>
  produce((state: State), (draft: State): void => {
    if (action.type == types.SESSION_NEW) {
      const sessionID = ((+state.metrics.sessionID || 0) + 1).toString();
      draft.metrics.sessionID = sessionID;
      draft.metrics.blockID = 0;
      draft.sessions[sessionID] = {
        id: sessionID,
        completed: false,
        startedAt: action.payload.startedAt,
        blocks: []
      };
    } else if (action.type == types.SESSION_RESET) {
      const {sessionID, startedAt} = action.payload;
      draft.metrics.sessionID = sessionID;
      draft.metrics.blockID = 0;
      draft.sessions[sessionID] = {
        id: sessionID,
        completed: false,
        startedAt: startedAt,
        blocks: []
      };
    } else if (action.type == types.BLOCK_NEW) {
      console.log("reducers> new_block action, state=", state, action);
      const blocks = state.sessions[state.metrics.sessionID].blocks;
      const blockID = ((+state.metrics.blockID || 0) + 1).toString();

      const gameIDs: string[] = values(state.blocks).map(
        (block: Block) => block.gameID
      );
      console.log("Games=", Games);
      const game: IGame = Games.filter(
        game => !gameIDs.includes(game.id)
      ).filter(game => game.blockToRun == blocks.length + 1)[0];
      console.log("game=", game);
      draft.metrics.gameID = game.id;
      draft.metrics.blockID = blockID;
      draft.metrics.lastActivity = new Date();
      draft.blocks[blockID] = {
        id: blockID,
        gameID: game.id,
        completed: false,
        trials: []
      };
      draft.sessions[draft.metrics.sessionID].blocks.push(blockID);
    } else if (action.type == types.BLOCK_START) {
      const blockID = state.metrics.blockID;
      draft.blocks[blockID].startedAt = action.payload.startedAt;
    } else if (action.type == types.TRIAL_START) {
      const trialID = ((+state.metrics.trialID || 0) + 1).toString();
      draft.metrics.trialID = trialID;
      draft.blocks[draft.metrics.blockID].trials.push(trialID);
      draft.trials[trialID] = {
        id: trialID,
        ...action.payload
      };
    } else if (action.type == types.TRIAL_SET_CATEGORY) {
      const {trialID} = state.metrics;
      draft.trials[trialID].category = action.payload;
    } else if (action.type == types.TRIAL_RESULT) {
      const {rt, timeout} = action.payload;
      const {trialID} = state.metrics;
      if (!trialID) return;
      const trial = state.trials[trialID];
      let response = undefined;
      if (trial.category == CATEGORY.GO) {
        response = trial.length > rt ? RESPONSE.SUCCESS : RESPONSE.OMISSION;
      } else if (trial.category == CATEGORY.NO_GO) {
        response = trial.length > rt ? RESPONSE.COMISSION : RESPONSE.SUCCESS;
      }
      draft.trials[trialID].response = response;
      draft.trials[trialID].rt = rt;
    }
  });

export default reducer;
