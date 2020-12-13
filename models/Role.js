const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("role", RoleSchema);
