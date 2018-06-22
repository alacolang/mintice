// @flow

import {
  put,
  call,
  takeEvery,
  takeLatest,
  select,
  all,
  take,
  race,
  fork
} from "redux-saga/effects";
import {delay} from "redux-saga";
import {pick, values, pluck, filter, compose} from "ramda";
import {AsyncStorage} from "react-native";
import type {Saga} from "redux-saga";
import messages from "../utils/fa";
import {diff, pickRandom} from "./games/helpers";
import Games, {CATEGORY, RESPONSE} from "./games";
import type {IGame} from "./games";
import * as types from "./types";
import routes from "./routes";
import * as actions from "./actions";
import config from "../config";
import type {State} from "./reducers";
import {uploadGame, persist, rehydrate} from "./persist";
const moment = require("moment");

function* navigate(path) {
  const {history} = yield select();
  yield call(history.replace, path);
}

function* extraLengthForHands() {
  const state = yield select();
  return state.game.metrics.gameID == "hands" ? 200 : 0;
}

function* question() {
  yield* navigate(routes.gameQuestion);
  const extraLength = yield* extraLengthForHands();
  const {result, timeout} = yield race({
    result: take(types.TRIAL_RESULT),
    timeout: call(delay, config.lengths.trial + extraLength)
  });
  if (timeout) {
    yield put(actions.trialResult(10 ** 6, true));
    console.log("timeout!");
  }
}

function* feedback() {
  yield* navigate(routes.gameFeedback);
  yield call(delay, config.lengths.feedback);
}

function* fixation() {
  yield* navigate(routes.gameFixation);
  yield call(delay, config.lengths.fixation);
}

function* blank() {
  yield* navigate(routes.gameBlank);
  yield call(delay, config.lengths.blank);
}
//
function* blockIntro() {
  console.log("block intro called");
  yield* navigate(routes.gameBlock);
}

function* trial(): Saga<void> {
  yield* fixation();
  yield* blank();
  yield* question();
  yield* feedback();
}

function* pickNextGame() {
  // return Games[14];

  const {game: state} = yield select();
  const completedGameIDs = state.sessions[state.metrics.sessionID].blockIDs.map(
    blockID => state.blocks[blockID].gameID
  );
  const completedGames = Games.filter(game =>
    completedGameIDs.includes(game.id)
  );

  const gameIDs: string[] = values(state.blocks)
    .filter(block => block.completed)
    .map(block => block.gameID)
    .filter(gameID => gameID != "hands");
  console.log("Games=", Games);
  console.log("done gameIDs=", gameIDs);

  const blockToRun = pickRandom(
    diff([1, 2, 3], pluck("blockToRun", completedGames))
  );
  // const blockToRun = 2;
  const game: IGame = compose(
    pickRandom,
    filter(game => !gameIDs.includes(game.id)),
    filter(game => game.blockToRun == blockToRun)
  )(Games);
  console.log("game=", game);
  // const rd = pickRandom([14, 3, "hands"]);
  // return Games.filter(game => game.id == rd)[0];
  return game;
}

function* block(): Saga<void> {
  console.log("block called");

  const game = yield* pickNextGame();
  if (!game) navigate(routes.gameAllDone);
  yield put(actions.newBlock(game.id));

  yield* blockIntro();
  yield take(types.BLOCK_START);
  let n = 0;
  while (n++ < config.blockTrials) {
    yield put(actions.startTrial(config.lengths.trial, currentTime()));
    yield* trial();
  }
  yield put(actions.completeBlock(currentTime()));
  yield call(delay, 1000);
  yield put(actions.persist("game"));
}

function* enoughToday() {
  yield* navigate(routes.gameEnoughToday);
}

function* sessionIntro() {
  yield* navigate(routes.gameSession);
  yield take(types.SESSION_START);
}

function currentTime() {
  return moment();
}

const isSameSession = (lastActivity: ?Date) =>
  // currentTime().diff(lastActivity, "seconds") < 30;
  currentTime().diff(lastActivity, config.newSessionAfter.unit) <
  config.newSessionAfter.quantity;

function* session(): Saga<void> {
  console.log("session called");
  const state: State = yield select();
  const {metrics: {sessionID, lastActivity}, sessions} = state.game;
  const sessionsCompleted = values(sessions).filter(
    session => session.completed
  ).length;
  if (sessionsCompleted > config.sessions) {
    yield navigate(routes.gameAllDone);
    return;
  }
  if (!sessionID) {
    yield put(actions.newSession(currentTime()));
  } else {
    const {blockIDs} = sessions[sessionID];
    if (blockIDs.length == config.sessionBlocks) {
      if (isSameSession(lastActivity)) {
        // recently done, it's enough
        if (!session.completed) {
          yield put(actions.completeSession(currentTime()));
          yield put(actions.persist("game"));
        }
        yield* uploadGame();
        yield* enoughToday();
        return;
      } else {
        // start next session, probably it's next day
        yield put(actions.newSession(currentTime()));
      }
    } else if (!isSameSession(lastActivity)) {
      yield put(actions.resetSession(sessionID, currentTime()));
    }
  }
  yield* sessionIntro();
  yield* block();
  yield* session();
}

function* init(): Saga<void> {
  console.log("init called");
  yield* rehydrate();
  // yield AsyncStorage.clear();
}

export default function* rootSaga(): Saga<void> {
  yield take(types.INIT);
  yield* init();
  yield takeLatest(types.SESSION_REQ, session);
  yield takeEvery(types.PERSIST, persist);
  yield takeEvery(types.SAVE_PROFILE, uploadGame);
  yield put(actions.reqSession());
}
