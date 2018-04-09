// @flow
import React from "react";
import type {Dispatch} from "redux";
import {connect} from "react-redux";
import {StyleSheet, View, TouchableOpacity, Image} from "react-native";
import {FormattedMessage} from "react-intl";
import MyText from "./MyText";
import logo from "../images/logo.png";
import {startSession} from "../logic/actions";
import {SESSION_BLOCKS} from "../logic/settings";
import type {State as RootState} from "../logic/reducers";
import Tabbar from "./Tabbar";

type Props = {
  dispatch: Dispatch,
  blocks: number
};

const BLOCK_TURN = {
  "0": "اول",
  "1": "دوم",
  "2": "سوم"
};

class GameSession extends React.Component<Props> {
  handleClick = () => {
    this.props.dispatch(startSession());
  };
  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Image style={styles.logo} source={logo} />
            <MyText style={styles.headerTitle}>
              <FormattedMessage id="session.title" />
            </MyText>
          </View>
          <MyText style={styles.text}>
            <FormattedMessage id="session.message1" />
          </MyText>
          <TouchableOpacity
            style={styles.playContainer}
            onPress={this.handleClick}
          >
            <MyText style={styles.play}>
              <FormattedMessage
                id="session.start"
                values={{block: BLOCK_TURN[String(this.props.blocks)]}}
              />
            </MyText>
          </TouchableOpacity>
        </View>
        <Tabbar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    marginTop: 20,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  headerContainer: {
    marginVertical: 30
  },
  logo: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2
  },
  headerTitle: {
    fontSize: 24
  },
  text: {
    marginVertical: 30,
    fontSize: 24
  },
  playContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkblue",
    height: 90,
    paddingHorizontal: 20,
    // width: 120
    borderRadius: 5
  },
  play: {
    fontSize: 28,
    color: "white",
    textAlign: "center"
  }
});
const mapStateToProps = (state: RootState) => ({
  blocks: state.game.sessions[state.game.metrics.sessionID].blockIDs.length
});
export default connect(mapStateToProps)(GameSession);
