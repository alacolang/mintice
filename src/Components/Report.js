import React from "react";
import {StyleSheet, Image, FlatList, View} from "react-native";
import {connect} from "react-redux";
import {values, sum} from "ramda";
import {FormattedMessage} from "react-intl";
import MyText from "./MyText";
import type {State as RootState} from "../logic/reducers";
import {RESPONSE} from "../logic/games";
import Tabbar from "./Tabbar";
import wallet from "../images/wallet.png";
const moment = require("moment-jalaali");

type Props = {
  sessions: any
};

class Report extends React.Component<Props> {
  render() {
    const {sessions} = this.props;
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Image style={styles.title} source={wallet} />
          <FlatList
            data={sessions}
            renderItem={({item}) => (
              <View style={styles.session} key={item.id}>
                <MyText style={styles.earnings}>
                  {sum(
                    item.blocks.map(block =>
                      sum(
                        block.trials
                          .filter(trial => trial.response == RESPONSE.SUCCESS)
                          .map(item => 1)
                      )
                    )
                  ) * 5}
                  <FormattedMessage id="report.currency" />
                  <FormattedMessage id="report.wallet" />
                </MyText>
                <MyText style={styles.text}>
                  <FormattedMessage id="report.success" />
                  {sum(
                    item.blocks.map(block =>
                      sum(
                        block.trials
                          .filter(trial => trial.response == RESPONSE.SUCCESS)
                          .map(item => 1)
                      )
                    )
                  )}
                </MyText>
                <MyText style={styles.text}>
                  <FormattedMessage id="report.failure" />
                  {sum(
                    item.blocks.map(block =>
                      sum(
                        block.trials
                          .filter(trial => trial.response != RESPONSE.SUCCESS)
                          .map(item => 1)
                      )
                    )
                  )}
                </MyText>
                <MyText style={styles.date}>
                  <FormattedMessage id="report.date" />
                  {moment(item.finishedAt).format("jYYYY/jM/jD HH:mm")}
                </MyText>
              </View>
            )}
          />
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
    paddingLeft: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flex: 1,
    width: "100%"
  },
  title: {
    // fontSize: 32,
    width: 100,
    height: 100,
    marginVertical: 20
  },
  session: {
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  text: {
    paddingVertical: 5,
    color: "darkorange"
  },
  earnings: {
    color: "green",
    fontWeight: "bold",
    paddingVertical: 5
  },
  date: {
    color: "grey",
    paddingVertical: 5
  }
});

const mapStateToProps = (state: RootState) => {
  const {sessions, blocks, trials} = state.game;
  const sessionsExtra = values(sessions).map(session => ({
    ...session,
    blocks: session.blockIDs.map(blockID => blocks[blockID]).map(block => ({
      ...block,
      trials: block.trialIDs.map(trialID => trials[trialID])
    }))
  }));
  return {
    sessions: sessionsExtra
  };
};
export default connect(mapStateToProps)(Report);
