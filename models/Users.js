const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  phoneNumber: String,
  fullName: String,
  age: Number,
  avatar: String, // we'll save the path to the image file
  userType: String,
  interestedServices: [String],
  skills: String,
  projectImages: [String], // array of paths to image files
});

module.exports = mongoose.model('User', UserSchema);
