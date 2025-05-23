const mongoose = require("mongoose");

const { Schema } = mongoose;

const floorSchema = new Schema(
  {
    floor_name: {
      type: String,
    },
    floor_total_videos: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const locationSchema = new Schema(
  {
    location_name: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      required: true,
    },
    zip_code: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "india",
    },

    floors: [floorSchema],
    total_videos: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Location", locationSchema);
