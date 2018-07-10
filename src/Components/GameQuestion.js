// @flow
import React from "react";
import {connect} from "react-redux";
import type {Dispatch} from "redux";
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {Route} from "react-router";
import {repeat} from "ramda";
import * as Progress from "react-native-progress";
import games from "../logic/games";
import type {Item, IGame} from "../logic/games";
import {trialResult, setTrialCategory} from "../logic/actions";
import type {State as RootState} from "../logic/reducers";
import {RESPONSE} from "../logic/games";
import routes from "../logic/routes";
import config from "../config";
import GameFeedback from "./GameFeedback";
import BlockProgressBar from "./BlockProgressBar";

type Props = {
  dispatch: Dispatch,
  game: IGame
};
type State = {
  item: ?Item,
  isGo: ?boolean,
  start: Date,
  warning: number
};

const FeedbackButton = ({handlePress, warning}) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      delayPressIn={50}
      // delayPressOut={0}
      onPressIn={handlePress}
      // style={styles.buttonContainer}
    >
      <FontAwesome style={styles.buttonIcon}>{Icons.thumbsUp}</FontAwesome>
    </TouchableOpacity>
    {/*<View style={styles.warning}>
      <Progress.Bar
        // size={105}
        width={50}
        height={5}
        // animated={false}
        progress={warning / 2}
        color="rgba(240, 240, 240, 1)"
      />
    </View>*/}
  </View>
);

class GameQuestion extends React.Component<Props, State> {
  state = {item: null, isGo: null, start: new Date(), warning: 0};
  progressTimer = undefined;

  componentDidMount() {
    const [category, item] = this.props.game.pickItem();
    this.props.dispatch(setTrialCategory(category));
    this.setState({item, isGo: category == "go"});

    // this.progressTimer = setInterval(this.warning, config.lengths.trial / 2);
  }
  componentWillUnmount() {
    // this.progressTimer && clearInterval(this.progressTimer);
  }
  warning = () => {
    this.setState({
      warning: this.state.warning + 1
    });
  };

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
            component={() => (
              <FeedbackButton
                warning={this.state.warning}
                handlePress={this.handlePress}
              />
            )}
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
    backgroundColor: "#fff"
  },
  body: {
    flex: 1
  },
  item: {
    overflow: "hidden",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    height: 50 + 50 + 40 + 20,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  playContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    width: 180,
    paddingBottom: 4,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#96C3BE"
  },
  buttonIcon: {
    color: "lightgrey",
    fontSize: 42 * 2.5
  },
  buttonContainer: {
    // flexDirection: "row",
    // height: 110,
    // width: 110,
    // borderWidth: 1,
    alignItems: "center"
    // justifyContent: "center"
  },
  warningContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "red"
  },
  // warning: {
  //   // width: 20, height: 20, backgroundColor: "red", borderRadius: 10
  //   width: 45,
  //   height: 45,
  //   borderRadius: 45 / 2,
  //   backgroundColor: "white"
  // },
  warning: {
    position: "absolute",
    alignItems: "center",
    top: -10,
    // top: 0,
    left: 0,
    right: 0
    // bottom: 0
    // borderWidth: 1,
    // borderColor: "red",
    // justifyContent: "center",
    // alignItems: "center"
    // left: 50
  }
});

const mapStateToProps = (state: RootState) => ({
  game: games.find(game => game.id == state.game.metrics.gameID)
});
export default connect(mapStateToProps)(GameQuestion);
