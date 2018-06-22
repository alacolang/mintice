// @flow
import type {Config} from "./index";

const config: Config = {
  lengths: {
    blank: 500,
    feedback: 700,
    fixation: 800,
    trial: 600
  },
  sessions: 2,
  sessionBlocks: 3,
  blockTrials: 10,
  goVsNogoPercentage: 80, // between 0 and 10,
  successValue: 5,
  baseUrl: "http://192.168.100.102:3000",
  newSessionAfter: {
    unit: "hours",
    quantity: 18
  }
};

module.exports = config;
