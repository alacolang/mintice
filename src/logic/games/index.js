// @flow

import type {Item, IGame} from "./Game";
export type {Item, IGame};
import Game1 from "./Game1";
import Game2 from "./Game2";
import Game3 from "./Game3";
import Hands from "./Hands";

const Games: IGame[] = [
  // Hands,
  Game1,
  Game2,
  Game3
];
export default Games;

export const RESPONSE = {
  SUCCESS: "SUCCESS",
  OMISSION: "OMISSION",
  COMISSION: "COMISSION"
};

export const CATEGORY = {
  GO: "GO",
  NO_GO: "NO_GO"
};

export type Category = $Values<typeof CATEGORY>;
export type Response = $Values<typeof RESPONSE>;
