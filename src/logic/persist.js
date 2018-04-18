// @flow

import {AsyncStorage} from "react-native";
import type {Action} from "./reducers";

import * as types from "./types";

const persist = store => next => (action: Action) => {
  if (action.type == types.PERSIST) {
    const state = store.getState();
    const key = action.payload;
    AsyncStorage.getItem("store").then(state => {
      AsyncStorage.setItem(
        "store",
        JSON.stringify({
          ...JSON.parse(state),
          [key]: state[key]
        })
      );
    });
  }
};
