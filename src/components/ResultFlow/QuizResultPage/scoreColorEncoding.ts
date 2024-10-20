import { hexToRgb, rgbToHex } from "@/utils/color";

export const ScoreGradientStops = [
  { at: 0, color: "#7AB6EC" },
  { at: 30.5, color: "#A7C5D0" },
  { at: 62.5, color: "#C8ACCE" },
  { at: 100, color: "#EC7A9D" },
];

export function computeScoreColor(percentageScore: number) {
  const stops = ScoreGradientStops;
  const stopIndex = stops.findIndex((stop) => stop.at >= percentageScore);
  if (stopIndex === 0) {
    return stops[0].color;
  } else if (stopIndex === stops.length) {
    return stops[stops.length - 1].color;
  } else {
    const lowerStop = stops[stopIndex - 1];
    const upperStop = stops[stopIndex];
    const relativePosition =
      (percentageScore - lowerStop.at) / (upperStop.at - lowerStop.at);
    return interpolateColor(lowerStop.color, upperStop.color, relativePosition);
  }
}

function interpolateColor(color1: string, color2: string, position: number) {
  const color1Values = hexToRgb(color1);
  const color2Values = hexToRgb(color2);
  const interpolatedValues = color1Values.map(
    (value, index) => value + (color2Values[index] - value) * position
  );
  return rgbToHex(interpolatedValues);
}
