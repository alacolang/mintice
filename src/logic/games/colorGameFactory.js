/* eslint react/display-name: 0 */
// @flow
import React from "react";
import { StyleSheet } from "react-native";
import { of, keys, values, sequence } from "ramda";
import Game1 from "./Game1";
import type { Item, IGame } from "./Game";
import MyText from "../../Components/MyText";
import { shuffleArray, pickRandom } from "./helpers";
import Goal from "../../Components/ColorBlockGoal";

// interface Item extends Item {
//   color: string;
// }
const itemFactory = (items): Item[] =>
  items.map(([color, text], idx) => ({
    id: idx,
    data: { color },
    Component: ({ textStyle }) => (
      <MyText style={[styles.text, { color }, textStyle]}>{text}</MyText>
    ),
  }));

const factory = (id: string, colors: { [key: string]: string }) => {
  const pickedColor = pickRandom(keys(colors));
  const items: Item[] = shuffleArray(
    itemFactory(sequence(of, [keys(colors), values(colors)]))
  );
  const Game: IGame = {
    ...Game1,
    id,
    blockToRun: 2,
    items,
    goItems(): Item[] {
      return items.filter(item => item.data.color != pickedColor);
    },
    data: { pickedColor: colors[pickedColor] },
    Goal,
  };

  return Game;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 48,
    fontWeight: "bold",
  },
});

export default factory;
