const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    auth0Id: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    savedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;