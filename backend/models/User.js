const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    img:
    {
        data: Buffer,
        contentType: String,
    },
    followers:
    {
      type: Array,
      required: true
    },
    follows:{
      type: Array,
      required: true
    },
    likes:{
      type: Array,
      required: true
    },
    login: {
        type: String,
        required: true,
    },
    password: {
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
    },
    description: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
  }
);
schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("user", schema);