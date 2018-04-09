// @flow

import {values, pluck, filter, compose} from "ramda";
import * as types from "../types";
import Games, {CATEGORY, RESPONSE} from "../games";
import {diff, pickRandom} from "../games/helpers";
import type {Category, Response, IGame} from "../games";
import type {Action} from "./index";

import produce from "immer";

export type Session = {
  id: string,
  completed: boolean,
  startedAt: Date,
  finishedAt?: Date,
  blockIDs: string[]
};
export type Block = {
  id: string,
  gameID: string,
  completed: boolean,
  startedAt?: Date,
  finishedAt?: Date,
  trialIDs: string[]
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
        blockIDs: []
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
    } else if (action.type == types.SESSION_COMPLETED) {
      const {sessionID} = state.metrics;
      draft.sessions[sessionID].completed = true;
      draft.sessions[sessionID].finishedAt = action.payload.finishedAt;
    } else if (action.type == types.BLOCK_NEW) {
      console.log("reducers> new_block action, state=", state, action);
      const completedBlocks = state.sessions[
        state.metrics.sessionID
      ].blockIDs.map(blockID => state.blocks[blockID]);
      const blockID = ((+state.metrics.blockID || 0) + 1).toString();

      const gameIDs: string[] = values(state.blocks)
        .filter((block: Block) => block.completed)
        .map((block: Block) => block.gameID);
      console.log("Games=", Games);
      console.log("done gameIDs=", gameIDs);

      const blockToRun = pickRandom(
        diff([1, 2, 3], pluck("blockToRun", completedBlocks))
      );
      const game: IGame = compose(
        pickRandom,
        filter(game => !gameIDs.includes(game.id)),
        filter(game => game.blockToRun == blockToRun)
      )(Games);
      console.log("game=", game);

      draft.metrics.gameID = game.id;
      draft.metrics.blockID = blockID;
      draft.metrics.lastActivity = new Date();
      draft.blocks[blockID] = {
        id: blockID,
        gameID: game.id,
        completed: false,
        trialIDs: []
      };
      draft.sessions[draft.metrics.sessionID].blockIDs.push(blockID);
    } else if (action.type == types.BLOCK_START) {
      const blockID = state.metrics.blockID;
      draft.blocks[blockID].startedAt = action.payload.startedAt;
    } else if (action.type == types.BLOCK_COMPLETED) {
      const blockID = state.metrics.blockID;
      draft.blocks[blockID].completed = true;
      draft.blocks[blockID].finishedAt = action.payload.finishedAt;
    } else if (action.type == types.TRIAL_START) {
      const trialID = ((+state.metrics.trialID || 0) + 1).toString();
      draft.metrics.trialID = trialID;
      draft.blocks[draft.metrics.blockID].trialIDs.push(trialID);
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
