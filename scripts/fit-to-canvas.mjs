import { Jimp } from "jimp";

const INPUT    = "public/differentials/differential-05.png";
const OUTPUT   = "public/differentials/differential-05.png";
const CANVAS_W = 1774;
const CANVAS_H = 887;

const img = await Jimp.read(INPUT);
const { width: w, height: h } = img.bitmap;
console.log(`Source: ${w}x${h}  ratio ${(w/h).toFixed(2)}:1`);

// Sample background color from corner (5x5 avg)
let rSum = 0, gSum = 0, bSum = 0, samples = 0;
for (let sx = 0; sx < 8; sx++) {
  for (let sy = 0; sy < 8; sy++) {
    const idx = (sy * w + sx) * 4;
    rSum += img.bitmap.data[idx];
    gSum += img.bitmap.data[idx + 1];
    bSum += img.bitmap.data[idx + 2];
    samples++;
  }
}
const bgR = Math.round(rSum / samples);
const bgG = Math.round(gSum / samples);
const bgB = Math.round(bSum / samples);
const bgColor = (bgR << 24) | (bgG << 16) | (bgB << 8) | 0xFF;
console.log(`Background sampled: rgb(${bgR}, ${bgG}, ${bgB})  hex #${bgR.toString(16).padStart(2,'0')}${bgG.toString(16).padStart(2,'0')}${bgB.toString(16).padStart(2,'0')}`);

// Scale source to fit canvas preserving aspect ratio
const scaleW = CANVAS_W / w;
const scaleH = CANVAS_H / h;
const scale  = Math.min(scaleW, scaleH);
const scaledW = Math.round(w * scale);
const scaledH = Math.round(h * scale);
img.resize({ w: scaledW, h: scaledH });
console.log(`Scaled: ${scaledW}x${scaledH}`);

// Canvas filled with sampled background color
const canvas = new Jimp({ width: CANVAS_W, height: CANVAS_H, color: bgColor >>> 0 });
const offX = Math.round((CANVAS_W - scaledW) / 2);
const offY = Math.round((CANVAS_H - scaledH) / 2);
canvas.composite(img, offX, offY);

await canvas.write(OUTPUT);

const finalRatio = (CANVAS_W / CANVAS_H).toFixed(2);
console.log(`\nOutput: ${CANVAS_W}x${CANVAS_H}  ratio ${finalRatio}:1`);
console.log(`Logo coverage: ${((scaledW/CANVAS_W)*100).toFixed(1)}% H  x  ${((scaledH/CANVAS_H)*100).toFixed(1)}% V`);
console.log(`Visual in card (~337px wide): ${Math.round(337 * scaledW / CANVAS_W)}x${Math.round(168 * scaledH / CANVAS_H)}px`);
