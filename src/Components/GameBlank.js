import React from "react";
import {StyleSheet, Text, View} from "react-native";
import ProgressBar from "./ProgressBar";

class GameBlank extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ProgressBar />
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
  }
});
export default GameBlank;
