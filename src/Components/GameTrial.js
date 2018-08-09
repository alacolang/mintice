// @flow
import React from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { View } from "react-native";
import { Route } from "react-router-native";
import GameQuestion from "./GameQuestion";
import GameFeedback from "./GameFeedback";
import GameBlank from "./GameBlank";
import GameFixation from "./GameFixation";
import TestTrial from "./TestTrial";
import routes from "../logic/routes";
import { reqSession } from "../logic/actions";
import BlockProgressBar from "./BlockProgressBar";

class GameTrial extends React.Component<{}> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Route path={routes.gameQuestion} component={GameQuestion} />
        <Route path={routes.gameBlank} component={GameBlank} />
        <Route path={routes.gameFeedback} component={GameFeedback} />
        <Route path={routes.gameFixation} component={GameFixation} />
        <BlockProgressBar />
        <TestTrial />
      </View>
    );
  }
}

export default GameTrial;
