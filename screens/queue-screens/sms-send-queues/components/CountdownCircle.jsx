import React from "react";
import Svg, { Circle, G } from "react-native-svg";

const CountdownCircle = ({ progress }) => {
  const size = 20;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 360) * circumference;

  return (
    <Svg width={size} height={size}>
      <G
        transform={`translate(${size / 2}, ${size / 2}) rotate(-90) translate(${-size / 2}, ${-size / 2})`}
      >
        {/* Background */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#4caf50"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
};

export default CountdownCircle;
