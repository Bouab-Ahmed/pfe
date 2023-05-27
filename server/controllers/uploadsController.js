const path = require("path");
const { StatusCodes } = require("http-status-codes");

//uplaod file in local server
const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new Error("No file uploaded");
  }

  const getImage = req.files.image;

  if (!getImage.mimetype.startsWith("image")) {
    throw new Error("please upload image");
  }

  if (getImage.size > 2048 * 2048) {
    throw new Error("please upload size less than 1MB");
  }

  const getPath = path.join(__dirname, "../public/uploads/" + getImage.name);

  await getImage.mv(getPath);

  return `/uploads/${getImage.name}`;

  // res.status(StatusCodes.OK).json({ image: `/uploads/${getImage.name}` });
};

module.exports = { uploadProductImageLocal };
