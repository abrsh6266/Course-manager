const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
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
    role: {
      type: String,
      enum: ["admin", "instructor", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare
userSchema.methods.comparePassword = async function (pwd) {
  return await bcrypt.compare(pwd, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
