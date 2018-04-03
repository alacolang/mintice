// @flow
import React from "react";
import {Svg, Circle} from "react-native-svg";
import {memoize, pluck, contains} from "ramda";

class MyCircle extends React.Component {
  render() {
    return (
      <Svg height="100" width="100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke={this.props.color}
          strokeWidth="2.5"
          fill={this.props.color}
        />
      </Svg>
    );
  }
}

const randomIntInRange = (lower: number, upper: number): number =>
  Math.floor(Math.random() * (upper - lower + 1)) + lower;
const randomInRange = (lower: number, upper: number): number =>
  Math.random() * (upper - lower) + lower;

type Item = {
  id: number,
  render: () => any
};
const diff = (a: Array<Item>, b: Array<Item>) =>
  a.filter(item => !contains(item.id, pluck("id", b)));

const game = {
  random: undefined,
  getRandomItemIdx() {
    if (this.random != undefined) return this.random;
    this.random = randomIntInRange(0, this.items.length - 1);
    return this.random;
  },
  check() {
    return this.items.length;
  },
  items: [
    {id: 1, render: <MyCircle color="yellow" />},
    {id: 2, render: <MyCircle color="green" />}
  ],
  goItems() {
    return [this.items[this.getRandomItemIdx()]];
  },
  nogoItems() {
    return diff(this.items, this.goItems());
  },
  pickItem() {
    const [goItems, nogoItems] = [this.goItems(), this.nogoItems()];
    const [category, idx] = pickRandomGoNogoIdx(
      this.items.length,
      goItems.length
    );
    return category == "go" ? goItems[idx] : nogoItems[idx];
  }
};

const pickRandomGoNogoIdx = (
  total: number,
  goLength: number
): ["go" | "nogo", number] => {
  const rand = randomInRange(0, 10);
  return rand < 7
    ? ["go", Math.floor(rand / 7 * goLength)]
    : ["nogo", Math.floor((10 - rand) / (10 - 7) * (total - goLength))];
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
