// @flow
import React from "react";
import {Rect} from "react-native-svg";

type Props = {color?: string};

const RectangleV = ({color = "blue"}: Props) => (
  <Rect
    x="25"
    y="0"
    width="50"
    height="100"
    stroke={color}
    strokeWidth="2.5"
    fill={color}
  />
);

export default RectangleV;
