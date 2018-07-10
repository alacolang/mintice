// @flow
import type {Config} from "./index";

const config: Config = {
  lengths: {
    blank: 500, // - 100,
    feedback: 700, // - 200,
    fixation: 800, // - 300,
    trial: 600 + 200
  },
  sessions: 10,
  sessionBlocks: 3,
  blockTrials: 200,
  goVsNogoPercentage: 70, // between 0 and 10,
  successValue: 5, // 3000 / (SESSION_BLOCKS * BLOCK_TRIALS)
  baseUrl: "http://dbtteen.ir",
  newSessionAfter: {
    unit: "hours",
    quantity: 18
  }
};

module.exports = config;
