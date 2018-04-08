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
  renderItem = item => <View key={item.id}>{item.render()}</View>;
  render() {
    const {game} = this.props;
    return (
      <View style={styles.container}>
        <MyText style={styles.items}>
          <FormattedMessage id="block.pickGoItems" />
        </MyText>
        {game.goItems().map(this.renderItem)}
        <MyText style={styles.items}>
          <FormattedMessage id="block.skipNoGoItems" />
        </MyText>
        {game.nogoItems().map(this.renderItem)}
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
    justifyContent: "center",
    alignItems: "center"
  },
  items: {
    marginVertical: 15
  },
  playContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkblue",
    height: 90,
    width: 180,
    marginTop: 30,
    paddingHorizontal: 20,
    // width: 120
    borderRadius: 5
  },
  play: {
    fontSize: 28,
    color: "white",
    textAlign: "center"
  }
});

const mapStateToProps = (state: RootState) => ({
  game: games.find(game => game.id == state.game.metrics.gameID)
});
export default connect(mapStateToProps)(GameBlock);
