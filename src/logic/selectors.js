import {select} from "redux-saga/effects";
import {pluck, values, filter, compose} from "ramda";
import config from "../config";
import type {IGame} from "./games";
import Games, {CATEGORY, RESPONSE} from "./games";
import type {State} from "./reducers";
import {diff, pickRandom} from "./games/helpers";

const moment = require("moment");

export function currentTime() {
  return moment();
}

export function* isSameSession() {
  const state: State = yield select();
  const {metrics: {lastActivity}} = state.game;
  // currentTime().diff(lastActivity, "seconds") < 30;
  return (
    currentTime().diff(lastActivity, config.newSessionAfter.unit) <
    config.newSessionAfter.quantity
  );
}

export function* getCurrentSession() {
  const state: State = yield select();
  const {metrics: {sessionID}, sessions} = state.game;
  return sessions[sessionID];
}

export function* isJustStarted() {
  const state: State = yield select();
  const {metrics: {sessionID}} = state.game;
  return !sessionID;
}

function sessionsCompleted(state: State) {
  const {sessions} = state.game;
  return values(sessions).filter(session => session.completed);
}
export function* isAllDone() {
  const state: State = yield select();
  return sessionsCompleted(state).length > config.sessions;
}

export function sessionCompletedBlocks(state: State) {
  const {metrics: {sessionID}, sessions, blocks} = state.game;
  return sessions[sessionID].blockIDs
    .map(blockID => blocks[blockID])
    .filter(block => block.completed);
}

export function* isSessionDone() {
  const state: State = yield select();
  return sessionCompletedBlocks(state).length == config.sessionBlocks;
}

export function* startBlockFromTrialNumber() {
  const state: State = yield select();
  const {metrics: {blockID}, blocks} = state.game;
  if (!blockID) return 0;
  return blocks[blockID].trialIDs.length;
}

export function* shouldResumeBlock() {
  const state: State = yield select();
  const {metrics: {blockID}, blocks} = state.game;
  return blockID && blocks[blockID].trialIDs.length < config.blockTrials;
}

// completed games in current session
function* getSessionCompletedGames() {
  const state: State = yield select();
  const {metrics: {sessionID}, sessions, blocks} = state.game;
  const completedGameIDs = sessions[sessionID].blockIDs.map(
    blockID => blocks[blockID].gameID
  );
  return Games.filter(game => completedGameIDs.includes(game.id));
}

// pick a blockToRun in current session
// each session should cover 3 types randoms presented
function* getBlockToRun() {
  const sessionCompletedGames = yield* getSessionCompletedGames();
  const blockToRun = pickRandom(
    diff([1, 2, 3], pluck("blockToRun", sessionCompletedGames))
  );
  return blockToRun;
}

// completed game IDs in all sessions
function* getCompletedGameIDs() {
  const state: State = yield select();
  const {metrics: {sessionID}, sessions, blocks} = state.game;
  const gameIDs: string[] = values(blocks)
    .filter(block => block.completed)
    .map(block => block.gameID)
    .filter(gameID => gameID != "hands");
  return gameIDs;
}

export function* pickNextGame() {
  // return Games[14];

  // console.log("Games=", Games);
  // console.log("done gameIDs=", gameIDs);

  const blockToRun = yield* getBlockToRun();
  const completedGameIDs = yield* getCompletedGameIDs();

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
