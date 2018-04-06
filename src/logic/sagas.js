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
import type {Saga} from "redux-saga";
import messages from "../fa";
import * as types from "./types";
import routes from "./routes";
import * as actions from "./actions";
import * as settings from "./settings";

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
  yield put(actions.pickGame());
  yield* blockIntro();
  // yield put(actions.startBlock(new Date()));
  yield take(types.BLOCK_START);
  let n = 0;
  yield put(actions.startTrial(settings.LENGTHS.TRIAL, new Date()));
  // while (n++ < settings.BLOCK_TRIALS) {
  //   yield take(types.TRIAL_START);
  //   yield* trial();
  //   yield put(actions.startTrial(settings.LENGTHS.TRIAL, new Date()));
  // }
}

function* session(): Saga<void> {
  console.log("session called");
  yield* block();
}

function* init(): Saga<void> {
  console.log("init called");
  yield put(actions.startSession(new Date()));
  // yield put(actions.startBlock(new Date())); // DELETE THIS!
  // yield* blockIntro();
  yield* session();
}

export default function* rootSaga(): Saga<void> {
  yield takeEvery(types.INIT, init);
  // yield takeEvery(types.SESSION_START, session);
  // yield takeEvery(types.BLOCK_START, block);
  yield takeEvery(types.TRIAL_START, trial);
}

setTimeout(() => {
  console.log("after 10secs");
}, 10 * 1000);
