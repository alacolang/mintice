// @flow
import React from "react";
import {Svg, Circle} from "react-native-svg";

class MyCircle extends React.Component {
  render() {
    return (
      <Svg height="100" width="100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke={this.props.color}
          strokeWidth="2.5"
          fill={this.props.color}
        />
      </Svg>
    );
  }
}

export default MyCircle;
