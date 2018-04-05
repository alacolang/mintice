// @flow
import * as types from "./types";
import type {Category} from "./games";
export const init = () => ({
  type: types.INIT
});

export const addHistory = (history: History) => ({
  type: types.ADD_HISTORY,
  payload: history
});

export const startSession = (startedAt: Date) => ({
  type: types.SESSION_START,
  payload: {startedAt}
});

export const pickGame = () => ({
  type: types.PICK_GAME
});

export const startBlock = (startedAt: Date) => ({
  type: types.BLOCK_START,
  payload: {startedAt}
});

export const startTrial = (length: number, startedAt: Date) => ({
  type: types.TRIAL_START,
  payload: {length, startedAt}
});

export const setTrialCategory = (category: Category) => ({
  type: types.TRIAL_SET_CATEGORY,
  payload: category
});

export const trialResult = (rt: number, timeout?: boolean = false) => ({
  type: types.TRIAL_RESULT,
  payload: {rt, timeout}
});
