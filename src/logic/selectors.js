// @flow

import { select } from "redux-saga/effects";
import { pluck, values, filter, compose } from "ramda";
import config from "../config";
import type { IGame } from "./games";
import Games from "./games";
import type { State } from "./reducers";
import { diff, pickRandom } from "./games/helpers";
import { currentTime } from "../utils/time";

export const isSameSession = ({
  game: {
    metrics: { lastActivity },
  },
}: State) =>
  currentTime().diff(lastActivity, config.newSessionAfter.unit) <
  config.newSessionAfter.quantity;

export function getCurrentSession(state: State) {
  const {
    metrics: { sessionID },
    sessions,
  } = state.game;
  return sessions[sessionID];
}

export function isJustStarted(state: State) {
  return !state.game.metrics.sessionID;
}

const sessionsCompleted = ({ game: { sessions } }: State) =>
  values(sessions).filter(session => session.completed);

export const isAllDone = (state: State) =>
  sessionsCompleted(state).length > config.sessions;

export function sessionCompletedBlocks(state: State) {
  const {
    metrics: { sessionID },
    sessions,
    blocks,
  } = state.game;
  return sessions[sessionID].blockIDs
    .map(blockID => blocks[blockID])
    .filter(block => block.completed);
}

export function isSessionDone(state: State) {
  return sessionCompletedBlocks(state).length == config.sessionBlocks;
}

export const startBlockFromTrialNumber = ({
  game: {
    metrics: { blockID },
    blocks,
  },
}: State) => (!blockID ? 0 : blocks[blockID].trialIDs.length);

export const shouldResumeBlock = ({
  game: {
    metrics: { blockID },
    blocks,
  },
}: State) => blockID && blocks[blockID].trialIDs.length < config.blockTrials;

// completed games in current session
const getSessionCompletedGames = (state: State) => {
  const completedGameIDs = sessionCompletedBlocks(state).map(
    block => block.gameID
  );
  return Games.filter(game => completedGameIDs.includes(game.id));
};

// pick a blockToRun in current session
// each session should cover 3 types randomly presented
const getBlockToRun = (state: State) =>
  pickRandom(
    diff([1, 2, 3], pluck("blockToRun", getSessionCompletedGames(state)))
  );

// completed game IDs in all sessions
const getCompletedGameIDs = ({
  game: {
    metrics: { sessionID },
    sessions,
    blocks,
  },
}: State): string[] =>
  values(blocks)
    .filter(block => block.completed)
    .map(block => block.gameID)
    .filter(gameID => gameID != "hands");

export function pickNextGame(state: State) {
  // return Games[3];

  // console.log("Games=", Games);
  // console.log("done gameIDs=", gameIDs);

  const blockToRun = getBlockToRun(state);
  const completedGameIDs = getCompletedGameIDs(state);

  // const blockToRun = 2;
  const game: IGame = compose(
    pickRandom,
    filter(game => !completedGameIDs.includes(game.id)),
    filter(game => game.blockToRun == blockToRun)
  )(Games);
  console.log("game=", game);
  // const rd = pickRandom([14, 3, "hands"]);
  // return Games.filter(game => game.id == rd)[0];
  return game;
}

export const isTestQuestion = ({
  game: {
    blocks,
    metrics: { blockID },
  },
}: State) => blocks[blockID].trialIDs.length <= config.testTrials;
