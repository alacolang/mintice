// @flow
import React from "react";
import type { Dispatch } from "redux";
import { connect } from "react-redux";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { FormattedMessage } from "react-intl";
import MyText from "./MyText";
import logo from "../images/logo.jpeg";
import { startSession } from "../logic/actions";
import type { State as RootState } from "../logic/reducers";
import Tabbar from "./Tabbar";
import { sessionCompletedBlocks } from "../logic/selectors";

type Props = {
  dispatch: Dispatch,
  blocks: number,
};

const BLOCK_TURN = {
  "0": "اول",
  "1": "دوم",
  "2": "سوم",
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
                  values={{ block: BLOCK_TURN[String(this.props.blocks)] }}
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
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 20,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    marginTop: 30,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
  headerTitle: {
    fontSize: 28,
    color: "#81D981",
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 21,
    lineHeight: 2 * 21,
    color: "grey",
    textAlign: "center",
  },
  footer: {
    height: 50 + 40,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  playContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: 200,
    paddingBottom: 4,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#a0a0a0",
  },
  play: {
    fontSize: 20,
    color: "#a0a0a0",
    // textAlign: "center"
  },
});
const mapStateToProps = (state: RootState) => ({
  blocks: sessionCompletedBlocks(state).length,
});
export default connect(mapStateToProps)(GameSession);
