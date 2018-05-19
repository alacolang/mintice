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
    timeout: call(delay, config.LENGTHS.TRIAL + extraLength)
  });
  if (timeout) {
    yield put(actions.trialResult(10 ** 6, true));
    console.log("timeout!");
  }
}

function* feedback() {
  yield* navigate(routes.gameFeedback);
  yield call(delay, config.LENGTHS.FEEDBACK);
}

function* fixation() {
  yield* navigate(routes.gameFixation);
  yield call(delay, config.LENGTHS.FIXATION);
}

function* blank() {
  yield* navigate(routes.gameBlank);
  yield call(delay, config.LENGTHS.BLANK);
}

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
  while (n++ < config.BLOCK_TRIALS) {
    yield put(actions.startTrial(config.LENGTHS.TRIAL, new Date()));
    yield* trial();
  }
  yield put(actions.completeBlock(new Date()));
  // yield put(actions.persist("game"));
}

function* enoughToday() {
  yield* navigate(routes.gameEnoughToday);
}

function* sessionIntro() {
  yield* navigate(routes.gameSession);
  yield take(types.SESSION_START);
}

const sessionOldEnough = (lastActivity: ?Date) =>
  moment().diff(lastActivity, "seconds") < 30;
// moment().diff(lastActivity, "hours") < 18

function* session(): Saga<void> {
  console.log("session called");
  const state: State = yield select();
  const {metrics: {sessionID, lastActivity}, sessions} = state.game;
  const sessionsCompleted = values(sessions).filter(
    session => session.completed
  ).length;
  if (sessionsCompleted > config.SESSIONS) {
    yield navigate(routes.gameAllDone);
    return;
  }
  if (!sessionID) {
    yield put(actions.newSession(new Date()));
  } else {
    const {blockIDs} = sessions[sessionID];
    if (blockIDs.length == config.SESSION_BLOCKS) {
      if (sessionOldEnough(lastActivity)) {
        // recently done, it's enough
        if (!session.completed) {
          yield put(actions.completeSession(new Date()));
          yield put(actions.persist("game"));
        }
        yield* uploadGame();
        yield* enoughToday();
        return;
      } else {
        // start next session, probably it's next day
        yield put(actions.newSession(new Date()));
      }
    } else if (!sessionOldEnough(lastActivity)) {
      yield put(actions.resetSession(sessionID, new Date()));
    }
  }
  yield* sessionIntro();
  yield* block();
  yield* session();
}

function* init(): Saga<void> {
  console.log("init called");
  yield* rehydrate();
  yield* uploadGame();
  yield AsyncStorage.clear();
}

export default function* rootSaga(): Saga<void> {
  yield take(types.INIT);
  yield* init();
  yield takeLatest(types.SESSION_REQ, session);
  yield takeEvery(types.PERSIST, persist);
  yield put(actions.reqSession());
}
