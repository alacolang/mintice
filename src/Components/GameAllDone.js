import React from "react";
import {StyleSheet, View, Image} from "react-native";
import {FormattedMessage} from "react-intl";
import MyText from "./MyText";
import logo from "../images/logo.png";
import Tabbar from "./Tabbar";

class GameAllDone extends React.Component {
  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.logo} source={logo} />
          </View>
          <MyText style={styles.title}>
            <FormattedMessage id="sessions.allDone1" />
          </MyText>
          <MyText style={styles.text}>
            <FormattedMessage id="sessions.allDone2" />
          </MyText>
          <MyText style={styles.text}>
            <FormattedMessage id="sessions.allDone3" />
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
    backgroundColor: "white"
  },
  container: {
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  header: {
    marginTop: 30,
    alignItems: "center"
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 100 / 2
  },
  title: {
    fontSize: 36,
    color: "#A1878D",
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15
  },
  text: {
    fontSize: 24,
    lineHeight: 2 * 24,
    color: "#798081"
  }
});
export default GameAllDone;
