// @flow
import React from "react";
import {Svg, Circle} from "react-native-svg";

type Props = {color: string};

const MyCircle = ({color}: Props) => (
  <Svg height="100" width="100">
    <Circle
      cx="50"
      cy="50"
      r="45"
      stroke={color}
      strokeWidth="2.5"
      fill={color}
    />
  </Svg>
);

export default MyCircle;
