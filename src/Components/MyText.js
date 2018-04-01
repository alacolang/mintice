// @flow

import React from "react";
import {Text, StyleSheet} from "react-native";

const MyText = ({style, children}) => (
  <Text style={[style, styles.persian]}>{children}</Text>
);

const styles = StyleSheet.create({
  persian: {
    fontFamily: "IRANYekanRDMobile",
    textAlign: "left"
  }
});
export default MyText;
