const mongoose = require("mongoose");
const User = require("./User.js");

const { Schema } = mongoose;

<<<<<<< HEAD
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
=======
const VideoSchema = new Schema({
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
});
>>>>>>> c26ddf2af5e2ff8fd3d0becded9c81543af29267

module.exports = mongoose.model("Video", VideoSchema);
