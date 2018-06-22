// @flow
import React from "react";
import {connect} from "react-redux";
import {length} from "ramda";
import {View, StyleSheet} from "react-native";
import type {State as RootState} from "../logic/reducers";
import config from "../config";

type Props = {
  progress: number
};
const defaultProps = {
  progress: 0
};

const ProgressBar = ({progress} = defaultProps) => (
  <View style={styles.container}>
    <View style={[styles.bar, {width: `${progress}%`}]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    alignItems: "flex-start"
  },
  bar: {
    height: 4,
    backgroundColor: "lightgreen"
  }
});

const mapStateToProps = (state: RootState) => {
  if (!state.game.metrics.blockID) return {progress: 0};
  const block = state.game.blocks[state.game.metrics.blockID];
  return {
    progress: Math.floor(length(block.trialIDs) / config.blockTrials * 100)
  };
};
export default connect(mapStateToProps)(ProgressBar);
