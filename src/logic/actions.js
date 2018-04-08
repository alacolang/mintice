// @flow
import * as types from "./types";
import type {Category} from "./games";
export const init = () => ({
  type: types.INIT
});

export const hydrateRedux = (state: any) => ({
  type: types.REDUX_HYDRATE,
  payload: state
});
export const addHistory = (history: History) => ({
  type: types.ADD_HISTORY,
  payload: history
});

export const startSession = () => ({
  type: types.SESSION_START
});

export const newSession = (startedAt: Date) => ({
  type: types.SESSION_NEW,
  payload: {startedAt}
});

export const resetSession = (sessionID: string, startedAt: Date) => ({
  type: types.SESSION_RESET,
  payload: {startedAt, sessionID}
});

export const newBlock = () => ({
  type: types.BLOCK_NEW
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
