// @flow

import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import MyText from "./MyText";
import { toPersianDigit } from "../utils/format";
import config from "../config";
import messages from "../utils/fa";

type Props = {};
type State = {
  radius: Animated.Value,
  holdCountDown: number,
  title: string,
  description: string
};
class Breathing extends React.Component<Props, State> {
  state = {
    radius: new Animated.Value(0),
    holdCountDown: 0,
    title: "",
    description: ""
  };
  breathingsCount = config.breathings;

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount() {}

  inhale = () => {
    this.setState({
      holdCountDown: Math.round(config.lengths.breathing.hold / 1000),
      title: messages["breathing.inhale"],
      description: messages["breathing.inhaleThrough"]
    });
  };

  hold = () => {
    if (this.state.holdCountDown > 0) {
      this.setState({
        holdCountDown: this.state.holdCountDown - 1,
        title: messages["breathing.hold"],
        description: `${toPersianDigit(this.state.holdCountDown)}`
      });
      setTimeout(() => {
        this.hold();
      }, 1000);
    } else this.exhale();
  };

  exhale = () => {
    this.setState({
      title: messages["breathing.exhale"],
      description: messages["breathing.exhaleWith"]
    });
    setTimeout(() => {
      this.setState({ title: "", description: "" });
    }, config.lengths.breathing.exhale);
  };

  animate = () => {
    this.inhale();
    setTimeout(this.hold, config.lengths.breathing.inhale);
    Animated.sequence([
      Animated.timing(this.state.radius, {
        toValue: 1,
        duration: config.lengths.breathing.inhale
      }),
      Animated.delay(config.lengths.breathing.hold),
      Animated.timing(this.state.radius, {
        toValue: 0,
        duration: config.lengths.breathing.exhale
      }),
      Animated.delay(config.lengths.breathing.preInhale)
    ]).start(this.shouldContinue);
  };

  shouldContinue = () => {
    this.breathingsCount--;
    if (this.breathingsCount > 0) this.animate();
  };

  render() {
    const { radius } = this.state;
    const r = radius.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 250 - 30]
    });
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Animated.View
            style={{
              width: r,
              height: r,
              borderRadius: r,
              backgroundColor: "#9db2d6",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <MyText style={styles.title}>{this.state.title}</MyText>
            <MyText style={styles.description}>{this.state.description}</MyText>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  body: {
    width: 250,
    height: 250,
    borderRadius: 250,
    backgroundColor: "#5a5f67",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 30,
    // fontWeight: "bold",
    color: "white"
  },
  description: {
    fontSize: 21,
    width: 70,
    textAlign: "center",
    color: "white"
  }
});

export default Breathing;
