// @flow
import React from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import type { Location } from "react-router-native";
import { FormattedMessage } from "react-intl";
import { prop } from "ramda";
import MyText from "./MyText";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { Route } from "react-router";
import games from "../logic/games";
import type { Item, IGame } from "../logic/games";
import { trialResult, setTrialCategory } from "../logic/actions";
import type { State as RootState } from "../logic/reducers";
import routes from "../logic/routes";
import GameFeedback from "./GameFeedback";
import BlockProgressBar from "./BlockProgressBar";
import { currentTime } from "../utils/time";

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

const TestQuestion = ({ isTest }) => (
  <View style={testQuestionStyles.container}>
    <MyText style={testQuestionStyles.title}>
      <FormattedMessage id="test.title" />
    </MyText>
    <MyText style={testQuestionStyles.description}>
      <FormattedMessage id="test.description" />
    </MyText>
  </View>
);

type Props = {
  dispatch: Dispatch,
  game: IGame,
  location: Location,
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
  componentWillUnmount() {}

  handlePress = () => {
    this.props.dispatch(
      trialResult(currentTime() - this.state.start, false, currentTime())
    );
  };
  render() {
    const { item } = this.state;
    const isTest = prop("isTest", this.props.location.state);
    if (!item) return null;
    return (
      <View style={styles.container}>
        {isTest && <TestQuestion />}
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
    fontSize: 42 * 2,
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

const testQuestionStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: (Dimensions.get("window").width - 70) / 2,
    borderWidth: 1,
    borderStyle: "dashed",
    width: 70,
    height: 70,
    borderRadius: 70,
    borderColor: "#9db2d6",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "0deg" }],
  },
  title: {
    color: "#9db2d6",
    fontSize: 14,
  },
  description: {
    color: "#9db2d6",
    fontSize: 9,
  },
});

const mapStateToProps = (state: RootState) => ({
  game: games.find(game => game.id == state.game.metrics.gameID),
});
export default connect(mapStateToProps)(GameQuestion);
