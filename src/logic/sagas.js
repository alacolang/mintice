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
import messages from "../fa";
import * as types from "./types";
import routes from "./routes";

function* navigate(path) {
  console.log("trail called");
  const {history} = yield select();
  yield call(history.push, path);
}

function* trial() {
  console.log("trial!");
  yield* navigate(routes.gameTrial);
  const {result, timeout} = yield race({
    result: take([
      types.TRIAL_SUCCESS,
      types.TRIAL_COMISSION,
      types.TRIAL_OMISSION
    ]),
    timeout: call(delay, 400)
  });
  if (timeout) {
    console.log("timeout!");
  }
}

function* feedback() {
  console.log("feedback!");
  yield* navigate(routes.gameFeedback);
  yield call(delay, 700);
}

function* fixation() {
  console.log("fixation!");
  yield* navigate(routes.gameFixation);
  yield call(delay, 800);
}

function* blank() {
  console.log("blank!");
  yield* navigate(routes.gameBlank);
  yield call(delay, 500);
}

function* session() {
  let n = 0;
  while (n++ < 10) {
    yield* fixation();
    yield* blank();
    yield* trial();
    yield* blank();
    yield* feedback();
  }
}

function* theSagas() {
  yield take(types.INIT);
  yield* session();
}

export default function* rootSaga() {
  yield all([theSagas()]);
}

setTimeout(() => {
  console.log("after 10secs");
}, 10 * 1000);
