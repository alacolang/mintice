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
import {pick} from "ramda";
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
  yield call(history.replace, path);
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
  yield put(actions.completeBlock(new Date()));
  yield put(actions.persist("game"));
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
    const {blockIDs} = sessions[sessionID];
    if (blockIDs.length == settings.SESSION_BLOCKS) {
      // if (moment().diff(lastActivity, "hours") < 18) {
      if (moment().diff(lastActivity, "minutes") < 5) {
        // recently done, it's enough
        if (!session.completed) {
          yield put(actions.completeSession(new Date()));
          yield put(actions.persist("game"));
        }
        yield* enoughToday();
        return;
      } else {
        // start next session, probably it's next day
        yield put(actions.newSession(new Date()));
      }
      //} else if (moment().diff(lastActivity, "hours") > 18) {
    } else if (moment().diff(lastActivity, "minutes") > 5) {
      yield put(actions.resetSession(sessionID, new Date()));
    }
  }
  yield* sessionIntro();
  yield* block();
  yield* session();
}

function parse(x) {
  try {
    return JSON.parse(x) || {};
  } catch (e) {
    return {};
  }
}

function* persist({payload: key}): Saga<void> {
  const state = yield select();
  const old = yield AsyncStorage.getItem("store");
  AsyncStorage.setItem(
    "store",
    JSON.stringify({
      ...parse(old),
      [key]: state[key]
    })
  );
  console.log("persisted:", yield AsyncStorage.getItem("store"));
}

const KEYS = ["profile", "game"];
function* rehydrate() {
  const state = yield AsyncStorage.getItem("store");
  yield put(actions.hydrateRedux(pick(KEYS, parse(state))));
}

function* init(): Saga<void> {
  console.log("init called");
  yield* rehydrate();
  // yield AsyncStorage.clear();
  // yield* session();
}

export default function* rootSaga(): Saga<void> {
  yield takeEvery(types.INIT, init);
  yield takeEvery(types.SESSION_REQ, session);
  yield takeEvery(types.PERSIST, persist);
}
