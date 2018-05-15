// @flow
import React from "react";
import {Rect} from "react-native-svg";

type Props = {color?: string};

const Rectangle = ({color = "green"}: Props) => (
  <Rect
    x="0"
    y="25"
    width="100"
    height="50"
    stroke={color}
    strokeWidth="2.5"
    fill={color}
  />
);

export default Rectangle;
