const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method

userSchema.statics.Signup = async function (email, password) {
  const exists = await this.findOne({ email });

  if (!email || !password) {
    throw Error("all fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("not a strong password");
  }

  if (exists) {
    throw Error("email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("please fill the fields proplerly");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("invalid email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("invalid password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
