const mongoose = require("mongoose");

const { Schema } = mongoose;

<<<<<<< HEAD
const RoleTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
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
=======
const RoleTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});
>>>>>>> c26ddf2af5e2ff8fd3d0becded9c81543af29267

module.exports = mongoose.model("RoleType", RoleTypeSchema);
