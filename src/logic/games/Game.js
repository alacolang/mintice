// @flow
import type {ComponentType} from "react";
import {randomIntInRange, pickRandomGoNogoIdx, diff} from "./helpers";
import {CATEGORY} from "./index";
import type {Category} from "./index";

export type Item = {
  id: number,
  render: ComponentType<any>
};

export interface IGame {
  id: number;
  blockToRun: number; // is this game runs in first block or third block
  items: Item[];
  goItems(): Item[];
  nogoItems(): Item[];
  pickItem(): [Category, Item];
}

const Game = {
  nogoItems(): Item[] {
    return diff(this.items, this.goItems());
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
