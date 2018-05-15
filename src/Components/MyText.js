// @flow

import React from "react";
import {StyleSheet, Text} from "react-native";
import type {Element} from "react";

type Props = {
  style: any,
  children: Element<*>
};

const MyText = ({style, children}: Props) => (
  <Text style={[style, styles.persian]}>{children}</Text>
);

const styles = StyleSheet.create({
  persian: {
    fontFamily: "IRANYekanRDMobile",
    textAlign: "left"
  }
});
export default MyText;
