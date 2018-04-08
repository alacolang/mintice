// @flow

import {
  put,
  call,
  takeEvery,
  select,
  all,
  take,
  race,
  fork
} from "redux-saga/effects";
import {delay} from "redux-saga";
import {AsyncStorage} from "react-native";
import type {Saga} from "redux-saga";
import messages from "../fa";
import * as types from "./types";
import routes from "./routes";
import * as actions from "./actions";
import * as settings from "./settings";
import type {State} from "./reducers";
const moment = require("moment");

function* navigate(path) {
  const {history} = yield select();
  yield call(history.push, path);
}

function* question() {
  yield* navigate(routes.gameQuestion);
  const {result, timeout} = yield race({
    result: take(types.TRIAL_RESULT),
    timeout: call(delay, settings.LENGTHS.TRIAL)
  });
  if (timeout) {
    yield put(actions.trialResult(10 ** 6, true));
    console.log("timeout!");
  }
}

function* feedback() {
  yield* navigate(routes.gameFeedback);
  yield call(delay, settings.LENGTHS.FEEDBACK);
}

function* fixation() {
  yield* navigate(routes.gameFixation);
  yield call(delay, settings.LENGTHS.FIXATION);
}

function* blank() {
  yield* navigate(routes.gameBlank);
  yield call(delay, settings.LENGTHS.BLANK);
}

function* blockIntro() {
  console.log("block intro called");
  yield* navigate(routes.gameBlock);
}

function* trial(): Saga<void> {
  yield* fixation();
  yield* blank();
  yield* question();
  yield* blank();
  yield* feedback();
}

function* block(): Saga<void> {
  console.log("block called");
  yield put(actions.newBlock());
  yield* blockIntro();
  yield take(types.BLOCK_START);
  let n = 0;
  while (n++ < settings.BLOCK_TRIALS) {
    yield put(actions.startTrial(settings.LENGTHS.TRIAL, new Date()));
    yield* trial();
  }
  const state = yield select();
  yield AsyncStorage.setItem("store", JSON.stringify({game: state.game}));
  console.log("saved=", yield AsyncStorage.getItem("store"));
}

function* enoughToday() {
  yield* navigate(routes.gameEnoughToday);
}

function* sessionIntro() {
  yield* navigate(routes.gameSession);
  yield take(types.SESSION_START);
}

function* session(): Saga<void> {
  console.log("session called");
  const state: State = yield select();
  const {metrics: {sessionID, lastActivity}, sessions} = state.game;
  if (!sessionID) {
    yield put(actions.newSession(new Date()));
  } else {
    const {blocks} = sessions[sessionID];
    if (blocks.length == settings.SESSION_BLOCKS) {
      if (moment().diff(lastActivity, "hours") < 18) {
        yield* enoughToday();
        return;
      } else yield put(actions.newSession(new Date()));
    } else if (moment().diff(lastActivity, "hours") > 18) {
      yield put(actions.resetSession(sessionID, new Date()));
    }
  }
  yield* sessionIntro();
  yield* block();
  yield* session();
}

function* init(): Saga<void> {
  console.log("init called");
  const state = yield AsyncStorage.getItem("store");
  try {
    yield put(actions.hydrateRedux(JSON.parse(state)));
  } catch (e) {}
  yield* session();
}

export default function* rootSaga(): Saga<void> {
  yield takeEvery(types.INIT, init);
  // yield takeEvery(types.SESSION_START, session);
  // yield takeEvery(types.BLOCK_START, block);
  // yield takeEvery(types.TRIAL_START, trial);
}
