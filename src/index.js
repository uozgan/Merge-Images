const crypto = require("crypto");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));

const getImageBuffer = require("./services/get-image-buffer");
const { handleMergeImages, handleSaveFile } = require("./utils");

const BASE_URL = "https://cataas.com/cat/says";
const imagesTexts = ["Hello", "You"];

(async () => {
  try {
    console.log("Processing...");

    const { width = 400, height = 500, color = "Pink", size = 100 } = argv;

    // create promises with specified image settings
    const imagesPromises = imagesTexts.map(async (text, index) => {
      const imagePositionX = index * 400;
      const imageBuffer = await getImageBuffer(
        `${BASE_URL}/${text}?width=${width}&height=${height}&color=${color}&size=${size}`
      );

      return { imageBuffer, x: imagePositionX, y: 0 };
    });

    // get the list of images based on their settings
    const images = await Promise.all(imagesPromises);

    // merge images into a single file
    const finalImage = await handleMergeImages(images);

    const imagesFolder = "merged-images";
    const fileName = `cat-${crypto.randomBytes(8).toString("hex")}.jpg`;
    const fileOutput = path.join(process.cwd(), `${imagesFolder}/${fileName}`);

    // save the finalImage inside specified directory
    await handleSaveFile(finalImage, "image/jpeg", fileOutput);

    console.log(`${fileName} image saved successfully`);
  } catch (e) {
    console.log(
      "Oops! Something went wrong... \nFailed to merge images. \nERROR: ",
      e.message,
      "\nTry again"
    );
  }
})();
