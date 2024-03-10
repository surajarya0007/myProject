const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  driveFileId: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  side: {
    type: String,
    required: true,
  },
  photos: [photoSchema], // Array of photo objects
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
