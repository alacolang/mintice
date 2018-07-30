// @flow

export type Lengths = {
  blank: number,
  feedback: number,
  fixation: number,
  trial: number,
  breathing: {
    inhale: number,
    hold: number,
    exhale: number,
    preInhale: number
  }
};

export type Config = {
  lengths: Lengths,
  sessions: number,
  sessionBlocks: number,
  blockTrials: number,
  goVsNogoPercentage: number,
  successValue: number,
  baseUrl: string,
  newSessionAfter: {
    unit: "hours" | "minutes",
    quantity: number
  }
};

let config: Config;
if (process.env.NODE_ENV == "development") {
  config = require("./development");
} else {
  config = require("./production");
}
// const config: Config = require("./development");

console.log("config=", config);
export default config;
