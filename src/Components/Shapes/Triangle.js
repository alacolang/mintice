// @flow
import React from "react";
import {Polygon} from "react-native-svg";

type Props = {color: string};

const Triangle = ({color}: Props) => (
  <Polygon
    points="50,5 95,97.5 5,97.5"
    fill={color}
    stroke={color}
    strokeWidth="1"
  />
);
export default Triangle;
