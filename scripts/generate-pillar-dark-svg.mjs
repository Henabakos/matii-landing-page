// Rebuild the white pillar artwork after changing a source SVG.
// Brand greens remain unchanged; neutral tones keep their depth in dark mode.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const directory = fileURLToPath(new URL("../public/illustrations/services", import.meta.url));
const neutrals = {
  "#111413": "#24292b",
  "#161819": "#f3f4f6",
  "#1e1e1e": "#f3f4f6",
  "#242424": "#e5e7eb",
  "#263238": "#d1d5db",
  "#2e353a": "#a1a1aa",
  "#37474f": "#a1a1aa",
  "#3c3c3c": "#a1a1aa",
  "#455a64": "#71717a",
  "#ebebeb": "#37474f",
  "#f5f5f5": "#263238",
};
for (const name of ["amico", "pana", "ai", "bro"]) {
  const source = fs.readFileSync(path.join(directory, `${name}.svg`), "utf8");
  let output = source.replace(/#[a-f\d]{6}\b/gi, color => neutrals[color.toLowerCase()] ?? color);
  // The enterprise floor is a grounding shadow, rather than part of the object.
  if (name === "amico") output = output.replace('fill="#f3f4f6"', 'fill="#24292b"');
  fs.writeFileSync(path.join(directory, `${name}-dark.svg`), output);
}
