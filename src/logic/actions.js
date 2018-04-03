// @flow
import * as types from "./types";
export const init = () => ({
  type: types.INIT
});

export const addHistory = (history: History) => ({
  type: types.ADD_HISTORY,
  payload: history
});

export const startTrial = () => ({
  type: types.TRIAL_START
});

export const trialResult = (rt: number, timeout?: boolean = false) => ({
  type: types.TRIAL_RESULT,
  payload: {rt}
});
