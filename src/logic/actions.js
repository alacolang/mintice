// @flow
import type {History} from "history";
import * as types from "./types";
import type {State as Profile} from "./reducers/profile";
import type {Category} from "./games";
export const init = () => ({
  type: types.INIT
});

export const hydrateRedux = (state: any) => ({
  type: types.REDUX_HYDRATE,
  payload: state
});

export const persist = (key: string) => ({
  type: types.PERSIST,
  payload: key
});

export const saveProfile = (profile: Profile) => ({
  type: types.SAVE_PROFILE,
  payload: profile
});

export const addHistory = (history: History) => ({
  type: types.ADD_HISTORY,
  payload: history
});

export const reqSession = () => ({
  type: types.SESSION_REQ
});

export const startSession = () => ({
  type: types.SESSION_START
});

export const completeSession = (finishedAt: Date) => ({
  type: types.SESSION_COMPLETED,
  payload: {finishedAt}
});

export const newSession = (startedAt: Date) => ({
  type: types.SESSION_NEW,
  payload: {startedAt}
});

export const resetSession = (sessionID: string, startedAt: Date) => ({
  type: types.SESSION_RESET,
  payload: {startedAt, sessionID}
});

export const newBlock = (gameID: string) => ({
  type: types.BLOCK_NEW,
  payload: gameID
});

export const startBlock = (startedAt: Date) => ({
  type: types.BLOCK_START,
  payload: {startedAt}
});

export const completeBlock = (finishedAt: Date) => ({
  type: types.BLOCK_COMPLETED,
  payload: {finishedAt}
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

export const reset = () => ({
  type: types.RESET
});
