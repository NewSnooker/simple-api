const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const schema = new mongoose.Schema(
  {
    username: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true, minlength: 5 },
    image: { type: String, default: "nopic.png" },
    role: { type: String, default: "member" },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

schema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(5);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};
schema.methods.checkPassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
};

const User = mongoose.model("users", schema);
module.exports = User;
