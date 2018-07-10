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
import BlockProgressBar from "./BlockProgressBar";
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
        <View style={styles.body}>
          <game.Goal game={game} />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.playContainer}
            onPress={this.handleClick}
          >
            <MyText style={styles.play}>
              {this.props.location.state.resume ? (
                <FormattedMessage id="block.continue" />
              ) : (
                <FormattedMessage id="block.start" />
              )}
            </MyText>
          </TouchableOpacity>
        </View>
        <BlockProgressBar />
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
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    height: 50 + 50 + 40,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  playContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: 150,
    paddingBottom: 4,
    borderWidth: 1,
    // borderRadius: 30,
    borderColor: "#a0a0a0"
  },
  play: {
    fontSize: 20,
    color: "#a0a0a0",
    textAlign: "center"
  }
});

const mapStateToProps = (state: RootState) => ({
  game: games.find(game => game.id == state.game.metrics.gameID)
});
export default connect(mapStateToProps)(GameBlock);
