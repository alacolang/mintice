// @flow
import React from "react";
import {View} from "react-native";
import {Route} from "react-router-native";
import GameQuestion from "./GameQuestion";
import GameSession from "./GameSession";
import GameFeedback from "./GameFeedback";
import GameBlank from "./GameBlank";
import GameBlock from "./GameBlock";
import GameFixation from "./GameFixation";
import routes from "../logic/routes";

class Game extends React.Component<{}> {
  render() {
    return (
      <View style={{flex: 1}}>
        <Route path={routes.gameBlock} component={GameBlock} />
        <Route path={routes.gameQuestion} component={GameQuestion} />
        <Route path={routes.gameFeedback} component={GameFeedback} />
        <Route path={routes.gameBlank} component={GameBlank} />
        <Route path={routes.gameFixation} component={GameFixation} />
        <Route path={routes.gameSession} exact component={GameSession} />
      </View>
    );
  }
}

export default Game;
