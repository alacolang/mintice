// @flow
import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Image } from "react-native";
import { FormattedMessage } from "react-intl";
import { prop } from "ramda";
import type { Location } from "react-router-native";
import { Icons } from "react-native-fontawesome";
import MyText from "./MyText";
import type { State } from "../logic/reducers";
import { RESPONSE } from "../logic/games";
import { coinSound } from "../utils/sound";
import iceImg from "../images/ice.jpeg";
import mintImg from "../images/mint.jpeg";
import BlockProgressBar from "./BlockProgressBar";

const TooLate = () => (
  <View style={tooLateStyles.container}>
    <MyText style={tooLateStyles.title}>
      <FormattedMessage id="feedback.tooLate" />
    </MyText>
  </View>
);

const tooLateStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 32, color: "#9db2d6" },
});

type Props = {
  success: boolean,
  omission: boolean,
  comission: boolean,
  location: Location,
};
class GameFeedback extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.success) this.playSound();
  }
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
    const isTest = prop("isTest", this.props.location.state);
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          {this.props.omission && <TooLate />}
          {this.props.comission && (
            <Image source={iceImg} style={styles.img} resizeMode="contain" />
          )}
          {this.props.success && (
            <Image source={mintImg} style={styles.img} resizeMode="contain" />
          )}
        </View>
        <BlockProgressBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  body: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 150,
    height: 150,
  },
});

const mapStateToProps = (state: State) => {
  const { response } = state.game.trials[state.game.metrics.trialID];
  return {
    omission: response == RESPONSE.OMISSION,
    comission: response == RESPONSE.COMISSION,
    success: response == RESPONSE.SUCCESS,
  };
};
export default connect(mapStateToProps)(GameFeedback);
