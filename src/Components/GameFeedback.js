// @flow
import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Animated, Easing } from "react-native";
import { Icons } from "react-native-fontawesome";
import type { State } from "../logic/reducers";
import { RESPONSE } from "../logic/games";
import { coinSound } from "../utils/sound";

type AnimateLostMoneyProps = {
  animatedValue: number,
};
const AnimateLostMoney = ({ animatedValue }: AnimateLostMoneyProps) => {
  const drop = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 95],
  });
  const color = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["red", "white"],
  });
  return (
    <Animated.View
      style={[
        styles.playContainer,
        {
          position: "absolute",
          bottom: drop,
          left: 0,
        },
      ]}
    >
      <Animated.Text style={[styles.lostMoney, { color }]}>- ۵</Animated.Text>
    </Animated.View>
  );
};

type Props = {
  success: boolean,
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

    return (
      <View>
        {!this.props.success && (
          <AnimateLostMoney animatedValue={this.animatedValue} />
        )}
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
  playContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: 80,
    width: 80,
    // borderWidth: 1,
  },
  lostMoney: {
    fontFamily: "IRANYekanRDMobile",
    color: "red",
    fontSize: 21,
  },
});

const mapStateToProps = (state: State) => ({
  success:
    state.game.trials[state.game.metrics.trialID].response == RESPONSE.SUCCESS,
});
export default connect(mapStateToProps)(GameFeedback);
