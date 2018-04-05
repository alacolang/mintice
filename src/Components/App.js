import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {NativeRouter as Router, Route, Redirect} from "react-router-native";
import MyText from "./MyText";
import Profile from "./Profile";
import Game from "./Game";
import routes from "../logic/routes";
import localize from "../localize";
import Init from "./Init";
import GameBlock from "./GameBlock";

class App extends React.Component {
  render() {
    return (
      <Router>
        <View style={styles.container}>
          <Route path="/" component={Init} />
          <Route
            path="/"
            exact
            render={() => <Redirect to={routes.profile} />}
          />
          <Route path={routes.profile} component={Profile} />
          <Route path={routes.game} component={Game} />
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

// export default localize(App, { textComponent: MyText })
export default App;
