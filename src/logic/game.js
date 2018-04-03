// @flow
import React from "react";
import {memoize, pluck, contains} from "ramda";
import Circle from "../Components/Circle";

const randomIntInRange = (lower: number, upper: number): number =>
  Math.floor(Math.random() * (upper - lower + 1)) + lower;
const randomInRange = (lower: number, upper: number): number =>
  Math.random() * (upper - lower) + lower;

export type Item = {
  id: number,
  render: () => any
};
export type Category = "go" | "nogo";

const diff = (a: Array<Item>, b: Array<Item>) =>
  a.filter(item => !contains(item.id, pluck("id", b)));

const game = {
  random: undefined,
  getRandomItemIdx() {
    if (this.random != undefined) return this.random;
    this.random = randomIntInRange(0, this.items.length - 1);
    return this.random;
  },
  items: [
    {id: 1, render: <Circle color="yellow" />},
    {id: 2, render: <Circle color="green" />}
  ],
  goItems() {
    return [this.items[this.getRandomItemIdx()]];
  },
  nogoItems() {
    return diff(this.items, this.goItems());
  },
  pickItem(): [Category, Item] {
    // const [goItems, nogoItems] = [this.goItems(), this.nogoItems()];
    // const [category, idx] = pickRandomGoNogoIdx(
    //   this.items.length,
    //   goItems.length
    // );
    // return [category, category == "go" ? goItems[idx] : nogoItems[idx]];
    return ["go", this.items[0]];
  }
};

type Range = [number, number];

const normalize = (domain: Range, range: Range, x: number): number =>
  (x - domain[0]) / (domain[1] - domain[0]) * (range[1] - range[0] + range[0]);

const GO_VS_NOGO_PERCENTAGE = 70; // between 0 and 100
const pickRandomGoNogoIdx = (
  total: number,
  goLength: number
): [Category, number] => {
  const rand = randomInRange(0, 100);
  return rand < GO_VS_NOGO_PERCENTAGE
    ? [
        "go",
        Math.floor(normalize([0, GO_VS_NOGO_PERCENTAGE], [0, goLength], rand))
      ]
    : [
        "nogo",
        Math.floor(
          normalize([GO_VS_NOGO_PERCENTAGE, 100], [0, total - goLength], rand)
        )
      ];
};

window.game = game;
export default game;
// 5 + 1
// create random number [1, 10]
// if < 7, divide by 5, choose one from go
// if > 7, divide by 1, chose one from nogo
//  _ _ _ _ _
// y in 1-5
// x in 1-7
// x / 7 * 5;
