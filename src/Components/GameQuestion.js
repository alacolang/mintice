// @flow
import React from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import games from "../logic/games";
import type { Item, IGame } from "../logic/games";
import { trialResult, setTrialCategory } from "../logic/actions";
import type { State as RootState } from "../logic/reducers";
import { currentTime } from "../utils/time";

type Props = {
  dispatch: Dispatch,
  game: IGame,
};
type State = {
  item: ?Item,
  isGo: ?boolean,
  start: Date,
};

class GameQuestion extends React.Component<Props, State> {
  state = { item: null, isGo: null, start: currentTime() };

  componentDidMount() {
    const [category, item] = this.props.game.pickItem();
    this.props.dispatch(setTrialCategory(category));
    this.setState({ item, isGo: category == "go" });
  }

  handlePress = () => {
    this.props.dispatch(
      trialResult(currentTime() - this.state.start, false, currentTime())
    );
  };

  render() {
    const { item } = this.state;
    if (!item) return null;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handlePress}>
          <item.Component />
        </TouchableOpacity>
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
});

const mapStateToProps = (state: RootState) => ({
  game: games.find(game => game.id == state.game.metrics.gameID),
});
export default connect(mapStateToProps)(GameQuestion);
