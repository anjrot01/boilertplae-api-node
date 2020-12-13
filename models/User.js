const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      ref: "role",
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("user", UserSchema);
