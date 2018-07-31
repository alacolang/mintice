// @flow

import * as React from "react";
import { StyleSheet, Text } from "react-native";
import type { Element } from "react";

type Props = {
  style: any,
  children: React.Node
};

const MyText = ({ style, children }: Props) => (
  <Text style={[styles.persian, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  persian: {
    fontFamily: "IRANYekanRDMobile",
    textAlign: "left"
  }
});
export default MyText;
