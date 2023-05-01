const path = require("path");
const { StatusCodes } = require("http-status-codes");

//uplaod file in local server
const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new Error("No File Uploaded");
  }

  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new Error("Please Upload Image");
  }

  if (productImage.size > 2024) {
    throw new Error("Please upload image smaller 2MB");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);

  return res
    .status(StatusCodes.OK)
    .json({ path: `/uploads/${productImage.name}` });
};

module.exports = { uploadProductImageLocal };
