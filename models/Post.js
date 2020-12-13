const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      type: String,
      trim: true
    },
    content: {
      type: String
    },
    author: {
      ref: "user",
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("post", PostSchema);
