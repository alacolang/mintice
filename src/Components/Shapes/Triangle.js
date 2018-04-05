// @flow
import React from "react";
import {Svg, Polygon} from "react-native-svg";

type Props = {color: string};

const Triangle = ({color}: Props) => (
  <Svg height="100" width="100">
    <Polygon
      points="0,0 50,0 25.0,43.3"
      fill={color}
      stroke={color}
      strokeWidth="1"
    />
  </Svg>
);
export default Triangle;
