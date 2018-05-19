// @flow

export type Lengths = {
  BLANK: number,
  FEEDBACK: number,
  FIXATION: number,
  FIXATION: number
};

export type Config = {
  LENGTHS: Lengths,
  SESSIONS: number,
  SESSION_BLOCKS: number,
  BLOCK_TRIALS: number,
  GO_VS_NOGO_PERCENTAGE: number,
  SUCCESS_VALUE: number,
  BASE_URL: string
};

// let config: Config;
// if (process.env.NODE_ENV == "development") {
//   config = require("./development");
// } else {
//   config = require("./production");
// }
const config: Config = require("./development");

console.log("config=", config);
export default config;
