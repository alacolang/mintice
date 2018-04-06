// @flow
import React from "react";
import {connect} from "react-redux";
import type {Dispatch} from "redux";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import games from "../logic/games";
import type {IGame} from "../logic/games";
import {startBlock, init} from "../logic/actions";
import type {State as RootState} from "../logic/reducers";

type Props = {
  dispatch: Dispatch,
  game: IGame
};
class GameBlock extends React.Component<Props> {
  handleClick = () => {
    this.props.dispatch(startBlock(new Date()));
  };
  renderItem = item => <View key={item.id}>{item.render()}</View>;
  render() {
    const {game} = this.props;
    return (
      <View style={styles.container}>
        <Text>Click on these:</Text>
        {game.goItems().map(this.renderItem)}
        <Text>Pass on these:</Text>
        {game.nogoItems().map(this.renderItem)}
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

const mapStateToProps = (state: RootState) => ({
  game: games.find(game => game.id == state.game.metrics.gameID)
});
export default connect(mapStateToProps)(GameBlock);
