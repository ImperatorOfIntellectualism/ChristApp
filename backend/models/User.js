const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    avatarUri: {
      type: String,
      required: false,
    },
    fullName: {
        type: String,
        required: true,
    },
    subText: {
        type: String,
        required: true,
    },
    dateOfRegistration: {
        type: String,
        required: true,
    },
    tweets: {
        type: Array,
        required: true
    }
  },
  {
    timestamps: true,
  }
);
schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("user", schema);