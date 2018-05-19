// @flow
import type {Config} from "./index";

const config: Config = {
  LENGTHS: {
    BLANK: 500,
    FEEDBACK: 700,
    FIXATION: 800,
    TRIAL: 700
  },
  SESSIONS: 2,
  SESSION_BLOCKS: 3,
  BLOCK_TRIALS: 3,
  GO_VS_NOGO_PERCENTAGE: 80, // between 0 and 10,
  SUCCESS_VALUE: 5,
  BASE_URL: "http://192.168.100.102:3000"
};

module.exports = config;
