// @flow

import {AsyncStorage} from "react-native";
import {put, select} from "redux-saga/effects";
import {pick} from "ramda";
import type {Saga} from "redux-saga";
import {hydrateRedux} from "./actions";
import * as api from "./api";
import getToken from "./token";

const KEYS = ["profile", "game"];
const STORE_KEY = "store";

function parse(x) {
  try {
    return JSON.parse(x) || {};
  } catch (e) {
    return {};
  }
}

export function* persist({payload: key}: {payload: string}): Saga<void> {
  const state = yield select();
  const old = yield AsyncStorage.getItem(STORE_KEY);
  AsyncStorage.setItem(
    STORE_KEY,
    JSON.stringify({
      ...parse(old),
      [key]: state[key]
    })
  );
  console.log("persisted:", yield AsyncStorage.getItem(STORE_KEY));
}

export function* rehydrate() {
  const state = yield AsyncStorage.getItem(STORE_KEY);
  yield put(hydrateRedux(pick(KEYS, parse(state))));
}

export function* uploadGame() {
  const token = yield getToken();
  const state = yield select();
  api.uploadGame(token, pick(KEYS, state));
}

// import type {Action} from "./reducers";
//
// import * as types from "./types";
//
// const persist = store => next => (action: Action) => {
//   if (action.type == types.PERSIST) {
//     const state = store.getState();
//     const key = action.payload;
//     AsyncStorage.getItem("store").then(state => {
//       AsyncStorage.setItem(
//         "store",
//         JSON.stringify({
//           ...JSON.parse(state),
//           [key]: state[key]
//         })
//       );
//     });
//   }
// };
//
//
