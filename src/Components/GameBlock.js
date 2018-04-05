// @flow
import React from "react";
import {connect} from "react-redux";
import type {Dispatch} from "redux";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import Game from "../logic/game";
import {startBlock, init} from "../logic/actions";

type Props = {
  dispatch: Dispatch
};
class GameBlock extends React.Component<Props> {
  // componentDidMount() {
  //   this.props.dispatch(init());
  // }
  handleClick = () => {
    this.props.dispatch(startBlock(new Date()));
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Click on these:</Text>
        {Game.goItems().map(item => item.render)}
        <Text>Pass on these:</Text>
        {Game.nogoItems().map(item => item.render)}
        <TouchableOpacity style={styles.play} onPress={this.handleClick}>
          <FontAwesome style={styles.playIcon}>{Icons.playCircleO}</FontAwesome>
        </TouchableOpacity>
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
  play: {
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  playIcon: {
    color: "pink",
    fontSize: 48
  }
});
export default connect()(GameBlock);
