// @flow
import type {Session} from "./reducers/game";
import {sum, map, compose, multiply} from "ramda";
import {RESPONSE} from "../logic/games";
import config from "../config";

export const sessionSuccess = (session: Session) =>
  sum(
    session.blocks.map(
      block =>
        block.trials.filter(trial => trial.response == RESPONSE.SUCCESS).length
    )
  );

export const sessionFailure = (session: Session) =>
  sum(
    session.blocks.map(
      block =>
        block.trials.filter(trial => trial.response != RESPONSE.SUCCESS).length
    )
  );

// const sessionsSuccess = sessions => sum(sessions.map(sessionSuccess));
export const sessionsSuccess = compose(sum, map(sessionSuccess));

export const gift = multiply(config.successValue);
