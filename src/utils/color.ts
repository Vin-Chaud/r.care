export function hexToRgb(hex: string) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

export function rgbToHex(rgb: number[]) {
  return (
    "#" +
    rgb.map((value) => Math.round(value).toString(16).padStart(2, "0")).join("")
  );
}

export function withOpacity(hexColor: string, opacity: number) {
  const rgb = hexToRgb(hexColor);
  return `rgba(${rgb.join(", ")}, ${opacity})`;
}
