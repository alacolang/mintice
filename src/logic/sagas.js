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
import { delay } from "redux-saga";
import { AsyncStorage } from "react-native";
import { sum, values } from "ramda";
import type { Saga } from "redux-saga";
import messages from "../utils/fa";
import type { IGame } from "./games";
import * as types from "./types";
import routes from "./routes";
import * as actions from "./actions";
import config from "../config";
import type { State } from "./reducers";
import { uploadGame, persist, rehydrate } from "./persist";
import {
  shouldResumeBlock,
  getCurrentSession,
  isJustStarted,
  isAllDone,
  isSessionDone,
  isSameSession,
  pickNextGame,
  startBlockFromTrialNumber,
  currentTime
} from "./selectors";

function* navigate(path, options) {
  const { history } = yield select();
  yield call(history.replace, path, options);
}

function* extraLengthForHands() {
  const state = yield select();
  return state.game.metrics.gameID == "hands" ? 200 : 0;
}

function* question() {
  yield* navigate(routes.gameQuestion);
  const extraLength = yield* extraLengthForHands();
  const { result, timeout } = yield race({
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
function* blockIntro(resume) {
  console.log("block intro called");
  yield* navigate(routes.gameBlock, { resume });
}

function* trial(): Saga<void> {
  yield* fixation();
  yield* blank();
  yield* question();
  yield* feedback();
}

function* setNextGame() {
  const game = yield* pickNextGame();
  if (!game) return navigate(routes.gameAllDone);
  yield put(actions.newBlock(game.id));
}

function* block(): Saga<void> {
  console.log("block called");
  const resume = yield* shouldResumeBlock();
  console.log("block> resume=", resume);
  if (!resume) yield* setNextGame();
  // yield* setNextGame();
  yield* blockIntro(resume);
  yield take(types.BLOCK_START);

  let n = yield* startBlockFromTrialNumber();
  // let n = 0;

  while (n++ < config.blockTrials) {
    yield put(actions.startTrial(config.lengths.trial, currentTime()));
    yield* trial();
    yield put(actions.persist("game"));
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

function* handleSessionDone() {
  const session = yield* getCurrentSession();
  if (!session.completed) {
    // session not marked as completed yet
    yield put(actions.completeSession(currentTime()));
    yield put(actions.persist("game"));
  }
  yield* uploadGame();
  yield* enoughToday();
}

function* session(): Saga<void> {
  console.log("session called");

  if (yield* isAllDone()) {
    yield navigate(routes.gameAllDone);
    return;
  }

  if (yield* isJustStarted()) {
    yield put(actions.newSession(currentTime()));
  } else {
    if (yield* isSessionDone()) {
      if (yield* isSameSession()) {
        yield* handleSessionDone();
        return;
      } else {
        // start next session, probably it's next day
        yield put(actions.newSession(currentTime()));
      }
    } else if (!isSameSession()) {
      // session is not done and old =>
      const state = yield select();
      yield put(
        actions.resetSession(state.game.metrics.sessionID, currentTime())
      );
    }
  }
  yield* sessionIntro();
  yield* block();
  yield* breathing();
  yield* session();
}

const breathingLength = () =>
  sum(values(config.lengths.breathing)) * config.breathings;

function* breathing(): Saga<void> {
  yield put(actions.startBreathing(currentTime()));
  yield navigate(routes.breathing);
  yield call(delay, breathingLength());
  yield put(actions.completeBreathing(currentTime()));
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
