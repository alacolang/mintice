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

const BlockProgressBar = ({progress} = defaultProps) => (
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
    alignItems: "flex-end"
  },
  bar: {
    height: 12,
    backgroundColor: "lightgreen"
  }
});

const mapStateToProps = (state: RootState) => {
  const {metrics: {blockID}, blocks} = state.game;
  if (!blockID) return {progress: 0};
  const block = blocks[blockID];
  return {
    progress: Math.floor(
      (length(block.trialIDs) - 1) / config.blockTrials * 100
    )
  };
};
export default connect(mapStateToProps)(BlockProgressBar);
