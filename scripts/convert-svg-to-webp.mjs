import sharp from "sharp";

const inputPath = "public/images/homeBgImg.svg";
const outputPath = "public/images/homeBgImg.webp";

try {
  const result = await sharp(inputPath, {
    density: 192,
  })
    .resize({
      width: 1220,
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
      alphaQuality: 100,
    })
    .toFile(outputPath);

  console.log(
    `Created ${outputPath}: ${(result.size / 1024).toFixed(1)} KB`,
  );
} catch (error) {
  console.error("Failed to convert SVG:", error);
  process.exitCode = 1;
}