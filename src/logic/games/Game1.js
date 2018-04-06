// @flow
import React from "react";
import {randomIntInRange, pickRandomGoNogoIdx, diff} from "./helpers";
import Game from "./Game";
import type {Item, IGame} from "./Game";
import {CATEGORY} from "./index";
import type {Category} from "./index";
import Circle from "../../Components/Shapes/Circle";

const Game1: IGame = {
  ...Game,
  id: "1",
  blockToRun: 1,
  random: undefined,
  items: [
    {id: 1, render: () => <Circle color="yellow" />},
    {id: 2, render: () => <Circle color="green" />}
  ],
  getRandomItemIdx() {
    if (this.random != undefined) return this.random;
    this.random = randomIntInRange(0, this.items.length - 1);
    return this.random;
  },
  goItems(): Item[] {
    return [this.items[this.getRandomItemIdx()]];
  }
};

export default Game1;
