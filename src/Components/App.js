// @flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter as Router, Route, Redirect } from "react-router-native";
import localize from "../utils/localize";
import MyText from "./MyText";
import Profile from "./Profile";
import Game from "./Game";
import routes from "../logic/routes";
import Init from "./Init";
import GameFeedback from "./GameFeedback";
import Report from "./Report";
import Breathing from "./Breathing";
import About from "./About";
import { codePushify } from "../utils/codepush";

const App = () => (
  <Router>
    <View style={styles.container}>
      <Route path="/" component={Init} />
      <Route path="/" exact render={() => <Redirect to={routes.breathing} />} />
      <Route path={routes.profile} component={Profile} />
      {/*<Route path={routes.gameFeedback} component={GameFeedback} />*/}
      <Route path={routes.breathing} component={Breathing} />
      <Route path={routes.game} component={Game} />
      <Route path={routes.report} component={Report} />
      <Route path={routes.about} component={About} />
    </View>
  </Router>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
    // breathing: 1, borderColor: 'red',
  }
});

export default codePushify(localize(App, { textComponent: MyText }));
