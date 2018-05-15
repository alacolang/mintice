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
    marginVertical: 30,
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
  text: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 21,
    lineHeight: 2 * 21,
    color: "#A0C251"
  },
  playContainer: {
    position: "absolute",
    bottom: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 140,
    paddingBottom: 4,
    borderWidth: 2,
    backgroundColor: "#96C3BE",
    borderColor: "black"
    // paddingHorizontal: 20,
    // shadowOffset: {width: 5, height: 5},
    // // shadowColor: "#276D68",
    // shadowColor: "#276D68",
    // shadowOpacity: 0.5,
    // elevation: 5,
  },
  play: {
    fontSize: 22,
    color: "white",
    textAlign: "center"
  }
});
const mapStateToProps = (state: RootState) => ({
  blocks: state.game.sessions[state.game.metrics.sessionID].blockIDs.length
});
export default connect(mapStateToProps)(GameSession);
