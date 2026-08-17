interface rgba {
  r: number;
  g: number;
  b: number;
  a?: number;
}

// Adapted From: https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
function hslToRgb(h: number, s: number, l: number): rgba {
  let r, g, b;

  function hue2rgb(p: number, q: number, t: number): number {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: r * 255,
    g: g * 255,
    b: b * 255,
  };
}

export function rgbaToString(color: rgba): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a ?? 1})`;
}

// smaller ratio (0-1) means more green
export function ratioToGreenRedColor(ratio: number): rgba {
  const hue = ((1 - ratio) * 120) / 360;
  const color = hslToRgb(hue, 1, 0.5);
  return color;
}
