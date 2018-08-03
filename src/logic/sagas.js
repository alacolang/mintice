// @flow

import {
  put,
  call,
  takeEvery,
  takeLatest,
  select,
  take,
  race,
} from "redux-saga/effects";
import { delay } from "redux-saga";
// import { AsyncStorage } from "react-native";
import type { Saga } from "redux-saga";
import * as types from "./types";
import type { State } from "./reducers";
import routes from "./routes";
import * as actions from "./actions";
import config from "../config";
import { uploadGame, persist, rehydrate } from "./persist";
import {
  isTestQuestion,
  shouldResumeBlock,
  getCurrentSession,
  isJustStarted,
  sessionCompletedBlocks,
  isAllDone,
  isSessionDone,
  isSameSession,
  pickNextGame,
  startBlockFromTrialNumber,
} from "./selectors";
import { currentTime } from "../utils/time";

function* navigate(path, options) {
  const { history } = yield select();
  yield call(history.replace, path, options);
}

function* extraLengthForHands() {
  const { game } = yield select();
  return game.metrics.gameID == "hands" ? 200 : 0;
}

function* question() {
  const state = yield select();
  yield* navigate(routes.gameQuestion, { isTest: isTestQuestion(state) });

  const extraLength = yield* extraLengthForHands();
  // yield take(types.TRIAL_RESULT);
  const { timeout } = yield race({
    result: take(types.TRIAL_RESULT),
    timeout: call(delay, config.lengths.trial + extraLength),
  });
  if (timeout) {
    yield put(actions.trialResult(10 ** 6, true, currentTime()));
    console.log("timeout!");
  }
}

function* feedback() {
  const state = yield select();
  yield* navigate(routes.gameFeedback, { isTest: isTestQuestion(state) });
  yield call(delay, config.lengths.feedback);
  // yield take(types.TRIAL_RESULT);
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

function* setNextGame(state: State) {
  const game = pickNextGame(state);
  if (!game) return navigate(routes.gameAllDone);
  yield put(actions.newBlock(game.id));
}

function* block(): Saga<void> {
  console.log("block called");
  const state = yield select();

  const resume = shouldResumeBlock(state);
  console.log("block> resume=", resume);
  if (!resume) yield* setNextGame(state);
  // yield* setNextGame(state);

  yield* blockIntro(resume);
  yield take(types.BLOCK_START);

  let n = startBlockFromTrialNumber(yield select());
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
  const state: State = yield select();
  const session = getCurrentSession(state);
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
  yield* uploadGame();

  const state: State = yield select();

  if (isAllDone(state)) {
    yield navigate(routes.gameAllDone);
    return;
  }

  if (isJustStarted(state)) {
    yield put(actions.newSession(currentTime()));
  } else {
    if (isSessionDone(state)) {
      if (isSameSession(state)) {
        yield* handleSessionDone();
        return;
      } else {
        // start next session, probably it's next day
        yield put(actions.newSession(currentTime()));
      }
    } else if (!isSameSession(state)) {
      // session is not done and old =>
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

function* breathing(): Saga<void> {
  const state = yield select();
  if (sessionCompletedBlocks(state).length == config.sessionBlocks) return;
  yield put(actions.startBreathing(currentTime()));
  yield navigate(routes.breathing);
  yield take(types.BREATHING_COMPLETED);
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
