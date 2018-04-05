// @flow
import {memoize, pluck, contains} from "ramda";
import {CATEGORY} from "./index";
import type {Category} from "./index";
import type {Item} from "./Game";
import {GO_VS_NOGO_PERCENTAGE} from "../settings";

export const randomIntInRange = (lower: number, upper: number): number =>
  Math.floor(Math.random() * (upper - lower + 1)) + lower;

export const randomInRange = (lower: number, upper: number): number =>
  Math.random() * (upper - lower) + lower;

export const diff = (a: Item[], b: Item[]): Item[] =>
  a.filter(item => !contains(item.id, pluck("id", b)));

type Range = [number, number];

const normalize = (domain: Range, range: Range, x: number): number =>
  (x - domain[0]) / (domain[1] - domain[0]) * (range[1] - range[0] + range[0]);

export const pickRandomGoNogoIdx = (
  total: number,
  goLength: number
): [Category, number] => {
  const rand = randomInRange(0, 100);
  return rand < GO_VS_NOGO_PERCENTAGE
    ? [
        CATEGORY.GO,
        Math.floor(normalize([0, GO_VS_NOGO_PERCENTAGE], [0, goLength], rand))
      ]
    : [
        CATEGORY.NO_GO,
        Math.floor(
          normalize([GO_VS_NOGO_PERCENTAGE, 100], [0, total - goLength], rand)
        )
      ];
};

// 5 + 1
// create random number [1, 10]
// if < 7, divide by 5, choose one from go
// if > 7, divide by 1, chose one from nogo
//  _ _ _ _ _
// y in 1-5
// x in 1-7
// x / 7 * 5;
