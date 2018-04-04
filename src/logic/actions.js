// @flow
import * as types from "./types";
import type {Category} from "./types";
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

export const startBlock = (startedAt: Date) => ({
  type: types.BLOCK_START,
  payload: {startedAt}
});

export const startTrial = (
  delay: number,
  startedAt: Date,
  category: Category
) => ({
  type: types.TRIAL_START,
  payload: {delay, startedAt, category}
});

export const trialResult = (rt: number, timeout?: boolean = false) => ({
  type: types.TRIAL_RESULT,
  payload: {rt}
});
