// @flow
import React from "react";
import type {Element} from "react";
import {View, StyleSheet} from "react-native";
import {Svg, Circle} from "react-native-svg";

type Props = {children: Element<*>};

const Container = (props: Props) => (
  <View style={styles.container}>
    <Svg height="100" width="100" viewBox="0 0 100 100">
      {props.children}
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {justifyContent: "center", alignItems: "center"}
});
export default Container;
