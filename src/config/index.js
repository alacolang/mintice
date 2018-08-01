// @flow

export type Lengths = {|
  blank: number,
  feedback: number,
  fixation: number,
  trial: number,
  breathing: {
    inhale: number,
    hold: number,
    exhale: number,
    preInhale: number,
  },
  breathings: number,
|};

export type Config = {|
  lengths: Lengths,
  sessions: number,
  sessionBlocks: number,
  blockTrials: number,
  goVsNogoPercentage: number,
  successValue: number,
  baseUrl: string,
  newSessionAfter: {
    unit: "hours" | "minutes",
    quantity: number,
  },
|};

let config: Config =
  process.env.NODE_ENV == "development"
    ? require("./development")
    : require("./production");

console.log("config=", config);

export default config;
// export default (config: Config);
