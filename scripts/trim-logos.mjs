import { Jimp } from "jimp";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const DIR = "public/differentials";
const files = readdirSync(DIR).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const filePath = join(DIR, file);
  const before = statSync(filePath).size;

  const img = await Jimp.read(filePath);
  const { width: w0, height: h0 } = img.bitmap;

  img.autocrop({ tolerance: 0.05, cropOnlyFrames: false, leaveBorder: 8 });

  const { width: w1, height: h1 } = img.bitmap;
  await img.write(filePath);

  const after = statSync(filePath).size;
  const areaRemoved = (((w0 * h0) - (w1 * h1)) / (w0 * h0) * 100).toFixed(1);

  console.log(
    `${file}\n` +
    `  Original:  ${w0}x${h0}px  ${(before/1024).toFixed(1)} KB\n` +
    `  Trimmed:   ${w1}x${h1}px  ${(after/1024).toFixed(1)} KB\n` +
    `  Area removida: ${areaRemoved}%\n`
  );
}
