// @flow
import * as React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import {
  NativeRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter
} from "react-router-native";
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

type AnimatedChildProps = {
  children: React.Node,
  // anim: Animated.Value,
  atParent: boolean,
  animating: boolean
};

class AnimatedChild extends React.Component<AnimatedChildProps, any> {
  state = {
    previousChildren: null,
    anim: new Animated.Value(0)
  };
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps> nextProps:", nextProps);
    const navigatingToParent = nextProps.atParent != this.props.atParent;
    const animationEnded = this.props.animating && !nextProps.animating;

    if (navigatingToParent) {
      console.log("animating...", Date.now());
      this.setState(
        {
          previousChildren: this.props.children
        },
        () => {
          Animated.timing(this.state.anim, {
            toValue: 1,
            duration: 1000
          }).start(this.enter);
        }
      );
    } else if (animationEnded) {
      this.enter();
    }
  }
  enter = () => {
    console.log("enter called", Date.now());
    this.setState(
      {
        previousChildren: null
      },
      () => {
        Animated.timing(this.state.anim, {
          toValue: 0,
          duration: 1000
        }).start();
      }
    );
  };
  render() {
    const { children } = this.props;
    const { previousChildren } = this.state;
    console.log("children=", children);
    console.log("previousChildren=", previousChildren);
    // return children;
    return (
      <Animated.View
        style={{
          // flex: 1,
          position: "absolute",
          left: 0,
          right: 0,
          top: this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0]
          })
          // opacity: this.state.anim.interpolate({
          //   inputRange: [0, 0.75],
          //   outputRange: [0, 1]
          // })
        }}
      >
        {previousChildren || children}
        {/* {children} */}
      </Animated.View>
    );
  }
}

const RouterChildren = props => (
  <View style={styles.container}>
    <Route path="/" component={Init} />
    <AnimatedChild atParent={props.location.key} animating={true}>
      <Switch location={props.location}>
        {/* <View style={styles.container}> */}
        <Route path="/" exact render={() => <Redirect to={routes.game} />} />
        <Route path={routes.profile} component={Profile} />
        <Route path={routes.breathing} component={Breathing} />
        <Route path={routes.game} component={Game} />
        <Route path={routes.report} component={Report} />
        <Route path={routes.about} component={About} />
        {/* </View> */}
      </Switch>
    </AnimatedChild>
  </View>
);
const RouterChildrenWithRouter = withRouter(RouterChildren);

class App extends React.Component<any, any> {
  state = {
    animating: true
  };
  render() {
    return (
      <Router>
        <RouterChildrenWithRouter />
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // breathing: 1, borderColor: 'red',
  }
});

export default codePushify(localize(App, { textComponent: MyText }));
