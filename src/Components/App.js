// @flow
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {NativeRouter as Router, Route, Redirect} from "react-router-native";
import localize from "../localize";
import MyText from "./MyText";
import Profile from "./Profile";
import Game from "./Game";
import routes from "../logic/routes";
import Init from "./Init";
import GameBlock from "./GameBlock";
import Report from "./Report";

class App extends React.Component {
  render() {
    return (
      <Router>
        <View style={styles.container}>
          <Route path="/" component={Init} />
          <Route path="/" exact render={() => <Redirect to={routes.game} />} />
          <Route path={routes.profile} component={Profile} />
          <Route path={routes.game} component={Game} />
          <Route path={routes.report} component={Report} />
        </View>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // borderWidth: 1, borderColor: 'red',
  }
});

export default localize(App, {textComponent: MyText});
