const axios = require("axios");

const getImageBuffer = async url => {
  try {
    const image = await axios.get(url, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(image.data).toString("base64");

    return imageBuffer;
  } catch (e) {
    console.log("Error while getting images", e);
  }
};

module.exports = getImageBuffer;
