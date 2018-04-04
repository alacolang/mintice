// @flow
export const INIT = "INIT";
export const ADD_HISTORY = "ADD_HISTORY";
export const BLOCK_START = "BLOCK_START";
export const SESSION_START = "SESSION_START";
export const TRIAL_START = "TRIAL_START";
export const TRIAL_RESULT = "TRIAL_RESULT";

export const RESPONSE_TYPE = {
  SUCCESS: "SUCCESS",
  OMISSION: "OMISSION",
  COMISSION: "COMISSION"
};

export const CATEGORY = {
  GO: "GO",
  NO_GO: "NO_GO"
};

export type Category = $Values<typeof CATEGORY>;
export type Response = $Values<typeof RESPONSE_TYPE>;
