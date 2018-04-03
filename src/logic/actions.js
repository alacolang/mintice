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

export const trialOmission = (
  session: number,
  block: number,
  trial: number
) => ({
  type: types.TRIAL_OMISSION,
  payload: {session, block, trial}
});

export const trialComission = (
  session: number,
  block: number,
  trial: number
) => ({
  type: types.TRIAL_OMISSION,
  payload: {session, block, trial}
});

export const trialSuccess = (
  session: number,
  block: number,
  trial: number
) => ({
  type: types.TRIAL_SUCCESS,
  payload: {session, block, trial}
});
