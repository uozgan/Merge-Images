const mergeImg = require("merge-img");

/**
 * Merge two or more image into a single one and returns it.
 * @param {Array} images - Array of objects containing image information such as: bufferImage, x, y.
 * @returns - Returns a promise of <Jimp> type from 'jimp' package.
 */
const handleMergeImages = async images => {
  try {
    return mergeImg(
      images.map(props => ({ ...props, src: new Buffer.from(props.imageBuffer, "base64") }))
    );
  } catch (e) {
    console.log("Error while merging images", e);
  }
};

module.exports = handleMergeImages;
