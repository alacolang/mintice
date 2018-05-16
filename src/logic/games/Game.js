// @flow
import type {ComponentType} from "react";
import {randomIntInRange, pickRandomGoNogoIdx, diffItems} from "./helpers";
import {CATEGORY} from "./index";
import type {Category} from "./index";

export interface Item {
  id: number;
  Component: any; //ComponentType<any>;
  data?: any;
}

export interface IGame {
  id: string;
  blockToRun: number; // is this game runs in first block or third block
  items: Item[];
  goItems(): Item[];
  nogoItems(): Item[];
  pickItem(): [Category, Item];
  Goal: ComponentType<any>;
  data?: any;
}

const Game = {
  nogoItems(): Item[] {
    return diffItems(this.items, this.goItems());
  },
  pickItem(): [Category, Item] {
    const [goItems, nogoItems] = [this.goItems(), this.nogoItems()];
    const [category, idx] = pickRandomGoNogoIdx(
      this.items.length,
      goItems.length
    );
    return [category, category == CATEGORY.GO ? goItems[idx] : nogoItems[idx]];
  }
};
export default Game;
