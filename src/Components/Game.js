// @flow
import React from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { View } from "react-native";
import { Route } from "react-router-native";
import GameSession from "./GameSession";
import GameBlock from "./GameBlock";
import GameTrial from "./GameTrial";
import GameEnoughToday from "./GameEnoughToday";
import GameAllDone from "./GameAllDone";
import routes from "../logic/routes";
import { reqSession } from "../logic/actions";

type Props = {
  dispatch: Dispatch,
};
class Game extends React.Component<Props> {
  componentDidMount() {
    setTimeout(() => this.props.dispatch(reqSession()), 0);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Route path={routes.gameBlock} component={GameBlock} />
        <Route path={routes.gameTrial} component={GameTrial} />
        <Route path={routes.gameEnoughToday} component={GameEnoughToday} />
        <Route path={routes.gameAllDone} component={GameAllDone} />
        <Route path={routes.gameSession} exact component={GameSession} />
      </View>
    );
  }
}

export default connect()(Game);
