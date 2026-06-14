import { Jimp } from "jimp";

const INPUT  = "public/differentials/differential-05.backup.png"; // da arte original
const OUTPUT = "public/differentials/differential-05.png";
const CANVAS_W = 1774;
const CANVAS_H = 887;
const PADDING  = 0.01; // 1% mínimo — maximiza presença visual

const img = await Jimp.read(INPUT);
const { width: w, height: h } = img.bitmap;

// 1. Encontra bounding box do conteúdo não-branco
let minX = w, maxX = 0, minY = h, maxY = 0;
img.scan(0, 0, w, h, function(x, y, idx) {
  const r = this.bitmap.data[idx];
  const g = this.bitmap.data[idx + 1];
  const b = this.bitmap.data[idx + 2];
  const a = this.bitmap.data[idx + 3];
  if (!(r > 240 && g > 240 && b > 240) && a > 10) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
});

const contentW = maxX - minX;
const contentH = maxY - minY;
console.log(`Conteúdo: ${contentW} x ${contentH}px  ratio ${(contentW/contentH).toFixed(2)}:1`);

// 2. Crop justo
img.crop({ x: minX, y: minY, w: contentW, h: contentH });

// 3. Área útil com padding mínimo
const usableW = Math.round(CANVAS_W * (1 - PADDING * 2));
const usableH = Math.round(CANVAS_H * (1 - PADDING * 2));

// 4. Escala preservando proporção
img.scaleToFit({ w: usableW, h: usableH });
const scaledW = img.bitmap.width;
const scaledH = img.bitmap.height;

// 5. Canvas branco + logo centralizada
const canvas = new Jimp({ width: CANVAS_W, height: CANVAS_H, color: 0xFFFFFFFF });
const offsetX = Math.round((CANVAS_W - scaledW) / 2);
const offsetY = Math.round((CANVAS_H - scaledH) / 2);
canvas.composite(img, offsetX, offsetY);

await canvas.write(OUTPUT);

console.log(`Canvas: ${CANVAS_W} x ${CANVAS_H}  ratio ${(CANVAS_W/CANVAS_H).toFixed(2)}:1`);
console.log(`Logo:   ${scaledW} x ${scaledH}px`);
console.log(`Cobertura H: ${((scaledW / CANVAS_W) * 100).toFixed(1)}%`);
console.log(`Cobertura V: ${((scaledH / CANVAS_H) * 100).toFixed(1)}%`);
console.log(`Visual no card (~337x168px): ${Math.round(337 * scaledW / CANVAS_W)} x ${Math.round(168 * scaledH / CANVAS_H)}px`);
