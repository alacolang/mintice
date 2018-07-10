import React from "react";
import {StyleSheet, Text, View} from "react-native";
import BlockProgressBar from "./BlockProgressBar";

class GameFixation extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>+</Text>
        <BlockProgressBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 48,
    color: "grey"
  }
});
export default GameFixation;
