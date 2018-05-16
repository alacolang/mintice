// @flow
import React from "react";
import {connect} from "react-redux";
import type {Dispatch} from "redux";
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {Route} from "react-router";
import games from "../logic/games";
import * as settings from "../logic/settings";
import type {Item, IGame} from "../logic/games";
import {trialResult, setTrialCategory} from "../logic/actions";
import type {State as RootState} from "../logic/reducers";
import {RESPONSE} from "../logic/games";
import routes from "../logic/routes";
import GameFeedback from "./GameFeedback";

type Props = {
  dispatch: Dispatch,
  game: IGame
};
type State = {
  item: ?Item,
  isGo: ?boolean,
  start: Date
};

const FeedbackButton = ({handlePress}) => (
  <TouchableOpacity
    delayPressIn={50}
    // delayPressOut={0}
    onPressIn={handlePress}
    // style={styles.buttonContainer}
  >
    <FontAwesome style={styles.buttonIcon}>{Icons.thumbsUp}</FontAwesome>
  </TouchableOpacity>
);

class GameQuestion extends React.Component<Props, State> {
  state = {item: null, isGo: null, start: new Date()};

  componentDidMount() {
    const [category, item] = this.props.game.pickItem();
    this.props.dispatch(setTrialCategory(category));
    this.setState({item, isGo: category == "go"});
  }
  handlePress = () => {
    this.props.dispatch(trialResult(new Date() - this.state.start));
  };
  render() {
    const {item} = this.state;
    if (!item) return null;
    const iconIdx = Math.floor(Math.random() * 4);
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
  body: {
    // marginBottom: 25,
    flex: 1
    // justifyContent: "center",
    // alignItems: "center"
  },
  item: {
    overflow: "hidden",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
    // width: 220,
    // height: 320,
    // justifyContent: "center",
  },
  footer: {
    height: 50 + 50 + 40,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  playContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 180,
    paddingBottom: 4,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#96C3BE"
  },
  buttonIcon: {
    color: "lightgrey",
    fontSize: 42 * 1.5
  }
});

const mapStateToProps = (state: RootState) => ({
  game: games.find(game => game.id == state.game.metrics.gameID)
});
export default connect(mapStateToProps)(GameQuestion);
