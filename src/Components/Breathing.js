// @flow

import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import type { Dispatch } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { sum, values } from "ramda";
import MyText from "./MyText";
import { toPersianDigit } from "../utils/format";
import config from "../config";
import messages from "../utils/fa";
import ProgressBar from "./ProgressBar";
import { completeBreathing } from "../logic/actions";
import { currentTime } from "../utils/time";

const breathingLength: number = sum(values(config.lengths.breathing));

type Props = {
  dispatch: Dispatch,
};
type State = {
  radius: Animated.Value,
  holdCountDown: number,
  title: string,
  description: string,
  ellapsed: number,
};
class Breathing extends React.Component<Props, State> {
  state = {
    radius: new Animated.Value(0),
    holdCountDown: 0,
    title: "",
    description: "",
    ellapsed: 0,
  };
  ticker = undefined;

  componentDidMount() {
    this.animate();
    this.ticker = setInterval(() => {
      this.setState({ ellapsed: this.state.ellapsed + 1000 });
    }, 1000);
  }

  componentWillUnmount() {
    this.ticker && clearInterval(this.ticker);
  }

  inhale = () => {
    this.setState({
      holdCountDown: Math.round(config.lengths.breathing.hold / 1000),
      title: messages["breathing.inhale"],
      description: messages["breathing.inhaleThrough"],
    });
  };

  hold = () => {
    if (this.state.holdCountDown > 0) {
      this.setState({
        holdCountDown: this.state.holdCountDown - 1,
        title: messages["breathing.hold"],
        description: `${toPersianDigit(this.state.holdCountDown)}`,
      });
      setTimeout(() => {
        this.hold();
      }, 1000);
    } else this.exhale();
  };

  exhale = () => {
    this.setState({
      title: messages["breathing.exhale"],
      description: messages["breathing.exhaleWith"],
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
        duration: config.lengths.breathing.inhale,
      }),
      Animated.delay(config.lengths.breathing.hold),
      Animated.timing(this.state.radius, {
        toValue: 0,
        duration: config.lengths.breathing.exhale,
      }),
      Animated.delay(config.lengths.breathing.preInhale),
    ]).start(this.repeatOrFinish);
  };

  repeatOrFinish = () => {
    if (this.state.ellapsed + breathingLength > config.lengths.breathings) {
      this.props.dispatch(completeBreathing(currentTime()));
    } else this.animate();
  };

  render() {
    const { radius } = this.state;
    const r = radius.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 250 - 30],
    });
    return (
      <View style={styles.container}>
        <MyText style={styles.header}>
          <FormattedMessage id="breathing.title" />
        </MyText>
        <View style={styles.body}>
          <Animated.View
            style={{
              width: r,
              height: r,
              borderRadius: r,
              backgroundColor: "#9db2d6",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MyText style={styles.title}>{this.state.title}</MyText>
            <MyText style={styles.description}>{this.state.description}</MyText>
          </Animated.View>
        </View>
        <ProgressBar
          progress={this.state.ellapsed / config.lengths.breathings * 100}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 50,
    fontSize: 18,
    color: "#9db2d6",
    width: 200,
    textAlign: "center",
    lineHeight: 1.4 * 18,
  },
  body: {
    width: 250,
    height: 250,
    borderRadius: 250,
    backgroundColor: "#5a5f67",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    // fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 21,
    width: 70,
    textAlign: "center",
    color: "white",
  },
});

export default connect()(Breathing);
