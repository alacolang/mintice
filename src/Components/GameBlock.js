// @flow
import React from "react";
import {connect} from "react-redux";
import type {Dispatch} from "redux";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {FormattedMessage} from "react-intl";
import games from "../logic/games";
import type {IGame} from "../logic/games";
import {startBlock, init} from "../logic/actions";
import type {State as RootState} from "../logic/reducers";
import MyText from "./MyText";

type Props = {
  dispatch: Dispatch,
  game: IGame
};
class GameBlock extends React.Component<Props> {
  handleClick = () => {
    this.props.dispatch(startBlock(new Date()));
  };
  render() {
    const {game} = this.props;
    return (
      <View style={styles.container}>
        <game.Goal game={game} />
        <TouchableOpacity
          style={styles.playContainer}
          onPress={this.handleClick}
        >
          <MyText style={styles.play}>
            <FormattedMessage id="block.start" />
          </MyText>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  playContainer: {
    position: "absolute",
    bottom: 50 + 40,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 140,
    borderWidth: 2,
    backgroundColor: "#96C3BE",
    borderColor: "white"
    // shadowOffset: {width: 5, height: 5},
    // shadowColor: "#276D68",
    // shadowOpacity: 0.5
  },
  play: {
    fontSize: 22,
    color: "white",
    textAlign: "center"
  }
});

const mapStateToProps = (state: RootState) => ({
  game: games.find(game => game.id == state.game.metrics.gameID)
});
export default connect(mapStateToProps)(GameBlock);
