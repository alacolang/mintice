// @flow
import type {Config} from "./index";

const config: Config = {
  lengths: {
    blank: 500,
    feedback: 700,
    fixation: 800,
    trial: 800
  },
  sessions: 10,
  sessionBlocks: 3,
  blockTrials: 200,
  goVsNogoPercentage: 70, // between 0 and 10,
  successValue: 5, // 3000 / (SESSION_BLOCKS * BLOCK_TRIALS)
  baseUrl: "http://198.143.181.153"
};

module.exports = config;
