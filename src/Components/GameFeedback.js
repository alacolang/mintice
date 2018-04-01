// @flow
import React from "react";
import {StyleSheet, View} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import MyText from "./MyText";

class GameFeedback extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FontAwesome style={styles.successIcon}>{Icons.smileO}</FontAwesome>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#404040"
  },
  successIcon: {
    color: "green",
    fontSize: 48 * 3
  }
});
export default GameFeedback;
