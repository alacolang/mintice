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
          <View style={styles.header}>
            <Image style={styles.logo} source={logo} />
            <MyText style={styles.headerTitle}>
              <FormattedMessage id="session.title" />
            </MyText>
          </View>
          <View style={styles.body}>
            <MyText style={styles.text}>
              <FormattedMessage id="session.message1" />
            </MyText>
          </View>
          <View style={styles.footer}>
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
  header: {
    marginTop: 30,
    alignItems: "center"
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 100 / 2
  },
  headerTitle: {
    fontSize: 32,
    color: "#4F938C",
    fontWeight: "bold"
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 21,
    lineHeight: 2 * 21,
    color: "#A0C251"
  },
  footer: {
    height: 50 + 40,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  playContainer: {
    position: "absolute",
    bottom: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 180,
    paddingBottom: 4,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#96C3BE"
  },
  play: {
    fontSize: 22,
    color: "#96C3BE",
    textAlign: "center"
  }
});
const mapStateToProps = (state: RootState) => ({
  blocks: state.game.sessions[state.game.metrics.sessionID].blockIDs.length
});
export default connect(mapStateToProps)(GameSession);
