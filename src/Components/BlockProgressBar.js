// @flow
import { connect } from "react-redux";
import { length } from "ramda";
import ProgressBar from "./ProgressBar";
import type { State as RootState } from "../logic/reducers";
import config from "../config";

const mapStateToProps = (state: RootState) => {
  const {
    metrics: { blockID },
    blocks,
  } = state.game;
  if (!blockID) return { progress: 0 };
  const block = blocks[blockID];
  return {
    progress: Math.floor(
      ((length(block.trialIDs) - 1) / config.blockTrials) * 100
    ),
  };
};
export default connect(mapStateToProps)(ProgressBar);
