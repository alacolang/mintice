// @flow

import type {Item, IGame} from "./Game";
export type {Item, IGame};
import Game1 from "./Game1"; // Circle yellow+green
import Game2 from "./Game2"; // Triangle green+blue
import Game3 from "./Game3"; // Circle+Triangle
import Game4 from "./Game4"; // RectangleV+RectangleH
import Game5 from "./Game5"; // rectangle+Square
import Game6 from "./Game6"; // Cirlce+Heart
import Game7 from "./Game7"; // Heart blue+red
import Game8 from "./Game8"; // Reactangle yellow+purple
import Game9 from "./Game9"; // Square blue+green
import Game10 from "./Game10"; // Reactangle yellow+purple
import colorGameFactory from "./colorGameFactory";
import Hands from "./Hands";

const COLORS_LABLES = {
  blue: "آبی",
  green: "سبز",
  red: "قرمز",
  grey: "خاکستری",
  yellow: "زرد",
  orange: "نارنجی",
  purple: "بنفش",
  pink: "صورتی",
  black: "سیاه",
  brown: "قهوه‌ای"
};
const pickColors = (colors: string[]) =>
  colors.reduce(
    (acc, color) => ({
      ...acc,
      [COLORS_VALUES[color]]: COLORS_LABLES[color]
    }),
    {}
  );
const COLORS_VALUES = {
  green: "#B4EF91",
  red: "#5E0016",
  blue: "#2E6AF3",
  yellow: "yellow",
  pink: "#FF69B4",
  purple: "#7B68EE",
  grey: "#575E5D",
  black: "black",
  orange: "orange",
  brown: "brown"
};

const Game11 = colorGameFactory("11", pickColors(["blue", "red", "green"]));
const Game12 = colorGameFactory(
  "12",
  pickColors(["yellow", "orange", "brown"])
);
const Game13 = colorGameFactory("13", pickColors(["black", "yellow", "blue"]));
const Game14 = colorGameFactory("14", pickColors(["red", "purple", "grey"]));
const Game15 = colorGameFactory("15", pickColors(["green", "yellow", "blue"]));
const Game16 = colorGameFactory("16", pickColors(["brown", "black", "yellow"]));
const Game17 = colorGameFactory("17", pickColors(["blue", "grey", "pink"]));
const Game18 = colorGameFactory("18", pickColors(["brown", "yellow", "blue"]));
const Game19 = colorGameFactory("19", pickColors(["blue", "purple", "pink"]));
const Game20 = colorGameFactory("20", pickColors(["grey", "purple", "blue"]));

const Games: IGame[] = [
  Hands,
  Game1,
  Game2,
  Game3,
  Game4,
  Game5,
  Game6,
  Game7,
  Game8,
  Game9,
  Game10,
  Game11,
  Game12,
  Game13,
  Game14,
  Game15,
  Game16,
  Game17,
  Game18
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
