// @flow
import React from "react";
import {connect} from "react-redux";
import type {Dispatch} from "redux";
import {View} from "react-native";
import {Route} from "react-router-native";
import GameQuestion from "./GameQuestion";
import GameSession from "./GameSession";
import GameFeedback from "./GameFeedback";
import GameBlank from "./GameBlank";
import GameBlock from "./GameBlock";
import GameFixation from "./GameFixation";
import gameEnoughToday from "./GameEnoughToday";
import routes from "../logic/routes";
import {init} from "../logic/actions";

type Props = {
  dispatch: Dispatch
};
class Game extends React.Component<Props> {
  componentDidMount() {
    this.props.dispatch(init());
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Route path={routes.gameBlock} component={GameBlock} />
        <Route path={routes.gameQuestion} component={GameQuestion} />
        <Route path={routes.gameFeedback} component={GameFeedback} />
        <Route path={routes.gameBlank} component={GameBlank} />
        <Route path={routes.gameFixation} component={GameFixation} />
        <Route path={routes.gameEnoughToday} component={gameEnoughToday} />
        <Route path={routes.gameSession} exact component={GameSession} />
      </View>
    );
  }
}

export default connect()(Game);
