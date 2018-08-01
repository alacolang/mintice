// @flow
import React from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { Route } from "react-router";
import games from "../logic/games";
import type { Item, IGame } from "../logic/games";
import { trialResult, setTrialCategory } from "../logic/actions";
import type { State as RootState } from "../logic/reducers";
import routes from "../logic/routes";
import GameFeedback from "./GameFeedback";
import BlockProgressBar from "./BlockProgressBar";

type FeedbackButtonProps = {
  handlePress: () => void,
};
const FeedbackButton = ({ handlePress }: FeedbackButtonProps) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      delayPressIn={50}
      // delayPressOut={0}
      onPressIn={handlePress}
    >
      <FontAwesome style={styles.buttonIcon}>{Icons.thumbsUp}</FontAwesome>
    </TouchableOpacity>
  </View>
);

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
  state = { item: null, isGo: null, start: new Date() };

  componentDidMount() {
    const [category, item] = this.props.game.pickItem();
    this.props.dispatch(setTrialCategory(category));
    this.setState({ item, isGo: category == "go" });
  }
  componentWillUnmount() {}

  handlePress = () => {
    this.props.dispatch(trialResult(new Date() - this.state.start));
  };
  render() {
    const { item } = this.state;
    if (!item) return null;
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <item.Component />
        </View>
        <View style={styles.body} />
        <View style={styles.footer}>
          <Route
            path={routes.gameQuestion}
            exact
            component={() => <FeedbackButton handlePress={this.handlePress} />}
          />
          <Route path={routes.gameFeedback} component={GameFeedback} />
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
    flex: 1,
  },
  item: {
    overflow: "hidden",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: 50 + 50 + 40 + 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  playContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    width: 180,
    paddingBottom: 4,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#96C3BE",
  },
  buttonIcon: {
    color: "lightgrey",
    fontSize: 42 * 2.5,
  },
  buttonContainer: {
    alignItems: "center",
  },
  warningContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "red",
  },
  warning: {
    position: "absolute",
    alignItems: "center",
    top: -10,
    left: 0,
    right: 0,
  },
});

const mapStateToProps = (state: RootState) => ({
  game: games.find(game => game.id == state.game.metrics.gameID),
});
export default connect(mapStateToProps)(GameQuestion);
