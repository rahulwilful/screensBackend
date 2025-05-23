const mongoose = require("mongoose");
const User = require("./User.js");

const { Schema } = mongoose;

const VideoSchema = new Schema(
  {
    video_url: {
      type: String,
      required: true,
    },
    client_id: {
      type: "ObjectId",
      ref: "User",
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
