import React from "react";
import {StyleSheet, View} from "react-native";
import {FormattedMessage} from "react-intl";
import MyText from "./MyText";
import Tabbar from "./Tabbar";

class GameEnoughToday extends React.Component {
  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <MyText style={styles.text1}>
            <FormattedMessage id="session.enoughToday1" />
          </MyText>
          <MyText style={styles.text2}>
            <FormattedMessage id="session.enoughToday2" />
          </MyText>
        </View>
        <Tabbar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text1: {
    fontSize: 36,
    color: "green",
    fontWeight: "bold",
    marginVertical: 15
  },
  text2: {
    fontSize: 28,
    color: "green"
  }
});
export default GameEnoughToday;
