const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);

/**
 * - Saves an image in the specified directory.
 * @param {Jimp} mergedImage - It is a <Jimp> file type from 'jimp' package.
 * @param {String} imageType - Image file type such as: "image/jpeg".
 * @param {String} output - Directory where the file get saved.
 * @returns
 */
const handleSaveFile = async (mergedImage, imageType, output) => {
  return new Promise((resolve, reject) => {
    mergedImage.getBuffer(imageType, (error, buffer) => {
      if (error) {
        reject(error);
      }

      writeFile(output, buffer, "binary", err => {
        if (err) {
          reject(err);
        }

        resolve(true);
      });
    });
  });
};

module.exports = handleSaveFile;
