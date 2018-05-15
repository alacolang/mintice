// @flow
import React from "react";
import {connect} from "react-redux";
import {StyleSheet, View} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import MyText from "./MyText";
import type {State} from "../logic/reducers";
import {RESPONSE} from "../logic/games";

type Props = {
  success: boolean
};
class GameFeedback extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        {this.props.success ? (
          <FontAwesome style={styles.successIcon}>{Icons.smileO}</FontAwesome>
        ) : (
          <FontAwesome style={styles.failIcon}>{Icons.frownO}</FontAwesome>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  successIcon: {
    color: "#7EB55B",
    fontSize: 48 * 2
  },
  failIcon: {
    color: "lightgrey",
    fontSize: 48 * 2
  }
});

const mapStateToProps = (state: State) => ({
  success:
    state.game.trials[state.game.metrics.trialID].response == RESPONSE.SUCCESS
});
export default connect(mapStateToProps)(GameFeedback);
