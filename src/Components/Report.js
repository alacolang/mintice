import React from "react";
import {StyleSheet, Image, FlatList, View} from "react-native";
import {connect} from "react-redux";
import {values, sum, isEmpty, compose, map, multiply} from "ramda";
import {FormattedMessage} from "react-intl";
import MyText from "./MyText";
import type {State as RootState} from "../logic/reducers";
import {RESPONSE} from "../logic/games";
import Tabbar from "./Tabbar";
import * as settings from "../logic/settings";
import wallet from "../images/wallet.png";
const moment = require("moment-jalaali");

type Props = {
  sessions: any
};

const gift = multiply(settings.SUCCESS_VALUE);

const sessionSuccess = session =>
  sum(
    session.blocks.map(
      block =>
        block.trials.filter(trial => trial.response == RESPONSE.SUCCESS).length
    )
  );

const sessionFailure = session =>
  sum(
    session.blocks.map(
      block =>
        block.trials.filter(trial => trial.response != RESPONSE.SUCCESS).length
    )
  );

// const sessionsSuccess = sessions => sum(sessions.map(sessionSuccess));
const sessionsSuccess = compose(sum, map(sessionSuccess));

const RenderSession = ({item: session}) => (
  <View style={styles.session} key={session.id}>
    <MyText style={styles.earnings}>
      {gift(sessionSuccess(session))}
      <FormattedMessage id="report.currency" />
      <FormattedMessage id="report.wallet" />
    </MyText>
    <MyText style={styles.text}>
      <FormattedMessage id="report.success" />
      {sessionSuccess(session)}
    </MyText>
    <MyText style={styles.text}>
      <FormattedMessage id="report.failure" />
      {sessionFailure(session)}
    </MyText>
    <MyText style={styles.date}>
      {/*<FormattedMessage id="report.date" />*/}
      {moment(session.finishedAt).format("jYYYY/jM/jD")}
    </MyText>
  </View>
);

class Report extends React.Component<Props> {
  render() {
    const {sessions} = this.props;
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Image style={styles.icon} source={wallet} />
          {gift(sessionsSuccess(sessions)) > 0 && (
            <MyText style={styles.total}>
              <FormattedMessage
                id="report.total"
                values={{total: gift(sessionsSuccess(sessions))}}
              />
            </MyText>
          )}
          {isEmpty(sessions) ? (
            <MyText style={styles.empty}>
              <FormattedMessage id="report.empty" />
            </MyText>
          ) : (
            <FlatList
              data={sessions}
              renderItem={RenderSession}
              keyExtractor={item => item.id}
            />
          )}
        </View>
        <Tabbar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#EFF9D8"
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    flex: 1
  },
  icon: {
    // fontSize: 32,
    width: 100,
    height: 100,
    marginBottom: 20
  },
  session: {
    // width: "100%",
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#358078",
    borderBottomWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 30
  },
  text: {
    fontSize: 18,
    paddingVertical: 5,
    color: "#BFDE78"
  },
  earnings: {
    color: "#76C46A",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 5
  },
  date: {
    fontSize: 16,
    color: "grey",
    paddingVertical: 5
  },
  empty: {
    flex: 1,
    marginTop: 20,
    fontSize: 21
  },
  total: {
    fontWeight: "bold",
    fontSize: 21,
    color: "#195C86",
    paddingVertical: 20
  }
});

const mapStateToProps = (state: RootState) => {
  const {sessions, blocks, trials} = state.game;
  const sessionsExtra = values(sessions)
    .filter(session => session.completed)
    .map(session => ({
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
