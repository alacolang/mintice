import React from "react";
import {StyleSheet, Text, View} from "react-native";

class GameBlank extends React.Component {
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#404040"
  }
});
export default GameBlank;