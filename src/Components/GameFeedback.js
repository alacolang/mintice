// @flow
import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Animated, Easing } from "react-native";
import { FormattedMessage } from "react-intl";
import { prop } from "ramda";
import type { Location } from "react-router-native";
import { Icons } from "react-native-fontawesome";
import MyText from "./MyText";
import type { State } from "../logic/reducers";
import { RESPONSE } from "../logic/games";
import { coinSound } from "../utils/sound";

type AnimateLostMoneyProps = {
  animatedValue: Animated.Value,
};
const AnimateLostMoney = ({ animatedValue }: AnimateLostMoneyProps) => {
  const drop = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [10, -15],
  });
  const color = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["darkred", "white"],
  });
  return (
    <Animated.View style={[lostMoneyStyles.container, { top: drop }]}>
      <Animated.Text style={[lostMoneyStyles.body, { color }]}>
        - ۵
      </Animated.Text>
    </Animated.View>
  );
};
const lostMoneyStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    position: "absolute",
    left: -30,
  },
  body: {
    fontFamily: "IRANYekanRDMobile",
    color: "darkred",
    fontSize: 21,
  },
});
const TooLate = () => (
  <View style={tooLateStyles.container}>
    <MyText style={tooLateStyles.title}>
      <FormattedMessage id="feedback.tooLate" />
    </MyText>
  </View>
);

const tooLateStyles = StyleSheet.create({
  container: { position: "absolute", top: -15, right: -40 },
  title: { fontSize: 18, color: "darkred" },
});

type Props = {
  success: boolean,
  omission: boolean,
  location: Location,
};
class GameFeedback extends React.Component<Props> {
  animatedValue = new Animated.Value(0);
  animatedShaking = new Animated.Value(0);

  componentDidMount() {
    if (!this.props.success) this.playSound();
    this.animate();
  }
  animate = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.quad,
    }).start();
    if (!this.props.success) {
      this.animatedShaking.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.animatedShaking, {
            toValue: 1,
            duration: 100,
            easing: Easing.linear,
          }),
          Animated.timing(this.animatedShaking, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
          }),
          Animated.timing(this.animatedShaking, {
            toValue: 0,
            duration: 100,
            easing: Easing.linear,
          }),
        ]),
        { iterations: 2 }
      ).start();
    }
  };
  playSound = () => {
    console.log("playSound called");
    coinSound.setVolume(4);
    coinSound.play(success => {
      if (success) {
        console.log("successfully finished playing");
      } else {
        console.log("playback failed due to audio decoding errors");
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        coinSound.reset();
      }
    });
  };

  render() {
    const shaking = this.animatedShaking.interpolate({
      inputRange: [-1, 1],
      outputRange: ["-30deg", "30deg"],
    });
    const handColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["lightgrey", this.props.success ? "#7EB55B" : "red"],
    });
    const isTest = prop("isTest", this.props.location.state);
    return (
      <View>
        {!this.props.success &&
          !isTest && <AnimateLostMoney animatedValue={this.animatedValue} />}
        {this.props.omission && <TooLate />}
        <Animated.Text
          style={[
            styles.buttonIcon,
            {
              color: handColor,
              transform: [
                {
                  rotateX: this.props.success ? "0deg" : shaking,
                },
              ],
            },
          ]}
        >
          {Icons.thumbsUp}
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  buttonIcon: {
    fontFamily: "FontAwesome",
    color: "lightgrey",
    fontSize: 42 * 2.5,
  },
});

const mapStateToProps = (state: State) => {
  const { response } = state.game.trials[state.game.metrics.trialID];
  return {
    omission: response == RESPONSE.OMISSION,
    success: response == RESPONSE.SUCCESS,
  };
};
export default connect(mapStateToProps)(GameFeedback);
