const mongoose = require("mongoose");
const User = require("./User.js");
const Location = require("./Location.js");

const { Schema } = mongoose;

const VideoSchema = new Schema(
  {
    secure_url: {
      type: String,
      required: true,
    },
    public_url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    client_id: {
      type: "ObjectId",
      ref: "User",
      required: true,
    },
    location_id: {
      type: "ObjectId",
      ref: "Location",
      required: true,
    },
    start_date: {
      type: Date,
      default: null,
    },
    end_date: {
      type: Date,
      default: null,
    },
    show_adv: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", VideoSchema);
