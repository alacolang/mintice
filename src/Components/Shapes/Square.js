// @flow
import React from "react";
import {Rect} from "react-native-svg";

type Props = {color?: string};

const Square = ({color = "blue"}: Props) => (
  <Rect
    x="10"
    y="10"
    width="80"
    height="80"
    stroke={color}
    strokeWidth="2.5"
    fill={color}
  />
);

export default Square;
