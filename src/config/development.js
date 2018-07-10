// @flow
import type {Config} from "./index";

const config: Config = {
  lengths: {
    blank: 500 - 100,
    feedback: 700 - 200,
    fixation: 800 - 300,
    trial: 600 + 200 - 400
  },
  sessions: 2,
  sessionBlocks: 3,
  blockTrials: 10,
  goVsNogoPercentage: 80, // between 0 and 10,
  successValue: 5,
  baseUrl: "http://192.168.100.102:3000",
  newSessionAfter: {
    unit: "minutes",
    quantity: 5
  }
};

module.exports = config;
