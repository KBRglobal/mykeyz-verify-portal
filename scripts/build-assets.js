const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const iconsDir = path.join(root, "assets", "icons");
const fontsDir = path.join(root, "assets", "fonts");
fs.mkdirSync(iconsDir, { recursive: true });
fs.mkdirSync(fontsDir, { recursive: true });

const phosphor = path.join(root, "node_modules", "@phosphor-icons", "core", "assets");
const navy = "#071B33";
const blue = "#2563EB";
const cyan = "#38BDF8";
const red = "#B42318";
const amber = "#B45309";

const icons = {
  brand: ["duotone/seal-check-duotone.svg", blue],
  ok: ["fill/seal-check-fill.svg", blue],
  bad: ["fill/x-circle-fill.svg", red],
  warn: ["fill/warning-circle-fill.svg", amber],
  document: ["fill/file-text-fill.svg", blue],
  hash: ["fill/hash-fill.svg", blue],
  signature: ["fill/signature-fill.svg", blue],
  time: ["fill/clock-countdown-fill.svg", blue],
  anchor: ["fill/stamp-fill.svg", blue],
  custody: ["fill/tree-structure-fill.svg", blue],
  capture: ["fill/file-magnifying-glass-fill.svg", blue],
  root: ["fill/fingerprint-simple-fill.svg", blue],
  seal: ["fill/seal-check-fill.svg", blue],
  privacy: ["fill/shield-check-fill.svg", blue],
  proof: ["fill/certificate-fill.svg", blue],
  copy: ["fill/copy-simple-fill.svg", navy],
  download: ["fill/download-simple-fill.svg", navy],
  open: ["fill/arrow-square-out-fill.svg", blue],
  spark: ["fill/shield-checkered-fill.svg", cyan],
  tick: ["fill/check-circle-fill.svg", blue]
};

function tint(svg, color) {
  return svg
    .replace(/currentColor/g, color)
    .replace(/fill="black"/g, `fill="${color}"`)
    .replace(/fill="#000"/g, `fill="${color}"`);
}

async function exportIcon(name, [rel, color]) {
  const svgPath = path.join(phosphor, rel);
  let svg = fs.readFileSync(svgPath, "utf8");
  svg = tint(svg, color);
  await sharp(Buffer.from(svg))
    .resize(192, 192, { fit: "contain" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(iconsDir, `${name}.png`));
}

function copyFont(from, to) {
  fs.copyFileSync(path.join(root, "node_modules", from), path.join(fontsDir, to));
}

(async () => {
  await Promise.all(Object.entries(icons).map(([name, spec]) => exportIcon(name, spec)));
  copyFont("@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2", "instrument-sans-latin-wght-normal.woff2");
  copyFont("@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2", "ibm-plex-mono-latin-500-normal.woff2");
})();
