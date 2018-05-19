// @flow
import type {Config} from "./index";

const config: Config = {
  LENGTHS: {
    BLANK: 500,
    FEEDBACK: 700,
    FIXATION: 800,
    TRIAL: 700
  },
  SESSIONS: 10,
  SESSION_BLOCKS: 3,
  BLOCK_TRIALS: 200,
  GO_VS_NOGO_PERCENTAGE: 80, // between 0 and 10,
  SUCCESS_VALUE: 5, // 3000 / (SESSION_BLOCKS * BLOCK_TRIALS)
  BASE_URL: "http://198.143.180.184"
};

module.exports = config;
