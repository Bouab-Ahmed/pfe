const { NotFoundError } = require("../errors");
const Tag = require("../models/tagModel");

const createTag = async (req, res) => {
  const tag = await Tag.create({ ...req.body });
  res.status(200).json({ tag });
};

const getAllTags = async (req, res) => {
  const tag = await Tag.find({});
  if (!tag) {
    throw new NotFoundError("no tag found");
  }
  res.status(200).json({ tag });
};

const getSingleTag = async (req, res) => {
  const tag = await Tag.findById({ _id: req.params.id });
  if (!tag) {
    throw new NotFoundError("no tag found");
  }
  res.status(200).json({ tag });
};

module.exports = { createTag, getAllTags, getSingleTag };
