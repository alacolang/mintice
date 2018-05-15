// @flow
import React from "react";
import {Circle} from "react-native-svg";

type Props = {color: string};

const MyCircle = ({color}: Props) => (
  <Circle
    cx="50"
    cy="50"
    r="45"
    stroke={color}
    strokeWidth="2.5"
    fill={color}
  />
);

export default MyCircle;
