// @flow
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-native";
import { StyleSheet, View, Dimensions } from "react-native";
import { FormattedMessage } from "react-intl";
import { prop } from "ramda";
import { isTestQuestion } from "../logic/selectors";
import MyText from "./MyText";

const Test = () => (
  <View style={styles.container}>
    <MyText style={styles.title}>
      <FormattedMessage id="test.title" />
    </MyText>
    <MyText style={styles.description}>
      <FormattedMessage id="test.description" />
    </MyText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: (Dimensions.get("window").width - 70) / 2,
    borderWidth: 1,
    // borderStyle: "dashed",
    width: 70,
    height: 70,
    borderRadius: 70,
    borderColor: "#9db2d6",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "0deg" }],
  },
  title: {
    color: "#9db2d6",
    fontSize: 14,
  },
  description: {
    color: "#9db2d6",
    fontSize: 9,
  },
});

type Props = { isTest: boolean };
const TestTrial = ({ isTest }: Props) => (isTest ? <Test /> : null);

const mapStateToProps = state => ({
  isTest: isTestQuestion(state),
});
export default connect(mapStateToProps)(TestTrial);
