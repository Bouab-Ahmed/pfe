const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
