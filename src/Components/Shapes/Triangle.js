// @flow
import React from "react";
import {Svg, Polygon} from "react-native-svg";

type Props = {color: string};

const Triangle = ({color}: Props) => (
  <Svg height="80" width="80">
    <Polygon
      points="0,0 60,0 30,60"
      fill={color}
      stroke={color}
      strokeWidth="1"
    />
  </Svg>
);
export default Triangle;
