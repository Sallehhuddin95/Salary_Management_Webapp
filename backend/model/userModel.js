const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userID: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      unique: true,
      required: [true, "Please add an ID value"],
      // ref: "User",
    },
    login: {
      type: String,
      unique: true,
      required: [true, "Please add a login value"],
    },
    name: {
      type: String,
      required: [true, "Please add a name value"],
    },
    salary: {
      type: Number,
      required: [true, "Please add a salary value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
