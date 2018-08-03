// @flow
import React from "react";
import { Platform } from "react-native";
import { View, StyleSheet } from "react-native";

type Props = {
  progress: number,
};
const defaultProps: Props = {
  progress: 0,
};

const ProgressBar = ({ progress }: Props = defaultProps) => (
  <View style={styles.container}>
    <View style={[styles.bar, { width: `${progress}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "ios" ? 20 : 0,
    left: 0,
    right: 0,
    width: "100%",
    alignItems: "flex-end",
  },
  bar: {
    height: 8,
    backgroundColor: "#9db2d6",
  },
});

export default ProgressBar;
