import React from "react";
import {StyleSheet, Text, View} from "react-native";

class Report extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} />
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
  text: {
    fontSize: 48,
    color: "white"
  }
});
export default Report;
