const { readdir, writeFile, rename } = require("fs/promises");
const { resolve, extname } = require("path");

async function start() {
  const trainImageDir = resolve(__dirname, "./swar/train");
  const trainImageFiles = await readdir(trainImageDir);
  const trainImages = trainImageFiles
    .filter((file) => file.endsWith(".jpg"))
    .map((file) => resolve(trainImageDir, file));

  for (const imageIdx in trainImages) {
    const image = trainImages[imageIdx];
    const txt = image.replace(".jpg", ".txt");

    const sanitizedName = image.substring(0, image.indexOf(".rf."));
    const newImageName = `${sanitizedName}.jpg`;
    const newTxtName = `${sanitizedName}.txt`;

    await rename(image, newImageName);
    await rename(txt, newTxtName);

    trainImages[imageIdx] = newImageName;
  }

  await writeFile(`${trainImageDir}/train.txt`, trainImages.join("\n"));

  const validImageDir = resolve(__dirname, "./swar/valid");
  const validImageFiles = await readdir(validImageDir);
  const validImages = validImageFiles
    .filter((file) => file.endsWith(".jpg"))
    .map((file) => resolve(validImageDir, file));

  for (const imageIdx in validImages) {
    const image = validImages[imageIdx];
    const txt = image.replace(".jpg", ".txt");

    const sanitizedName = image.substring(0, image.indexOf(".rf."));
    const newImageName = `${sanitizedName}.jpg`;
    const newTxtName = `${sanitizedName}.txt`;

    await rename(image, newImageName);
    await rename(txt, newTxtName);

    validImages[imageIdx] = newImageName;
  }

  await writeFile(`${validImageDir}/valid.txt`, validImages.join("\n"));
}

start();
