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
import { isTestQuestion } from "../logic/selectors";
import omissionImg from "../images/too-late.jpeg";
import comissionImg from "../images/ice.jpeg";
import successImg from "../images/mint.jpeg";
import BlockProgressBar from "./BlockProgressBar";

type MessageProps = {
  title: string,
  image: any,
  showTitle: boolean,
};
const Message = ({ title, image, showTitle }: MessageProps) => (
  <View style={tooLateStyles.container}>
    <Image source={image} style={styles.img} resizeMode="contain" />
    {showTitle && (
      <MyText style={tooLateStyles.title}>
        <FormattedMessage id={title} />
      </MyText>
    )}
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
  isTest: boolean,
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
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          {this.props.omission && (
            <Message
              title="feedback.omission"
              image={omissionImg}
              showTitle={this.props.isTest}
            />
          )}
          {this.props.comission && (
            <Message
              title="feedback.comission"
              image={comissionImg}
              showTitle={this.props.isTest}
            />
          )}
          {this.props.success && (
            <Message
              title="feedback.success"
              image={successImg}
              showTitle={this.props.isTest}
            />
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
    backgroundColor: "#fff",
  },
  img: {
    width: 150,
    height: 150,
  },
});

const mapStateToProps = (state: State) => {
  const { response } = state.game.trials[state.game.metrics.trialID];
  return {
    isTest: isTestQuestion(state),
    omission: response == RESPONSE.OMISSION,
    comission: response == RESPONSE.COMISSION,
    success: response == RESPONSE.SUCCESS,
  };
};
export default connect(mapStateToProps)(GameFeedback);
