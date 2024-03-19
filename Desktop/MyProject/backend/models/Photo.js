const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema({
  driveFileId: {
    type: String,
    required: true,
  },
  user: {
    type: [String],
    default: [],
  },
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
