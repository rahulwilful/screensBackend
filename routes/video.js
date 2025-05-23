const express = require("express");
const { body } = require("express-validator");
const ValidateToken = require("../middleWare/validateToken.js");
const {
  testVideoAPI,
  getAllVideos,
  getVideoById,
  addVideo,
  updateVideo,
  deleteVideo,
  uploadVideo,
} = require("../controllers/video.js");

const videoRouter = express.Router();

// @desc    Test Video API
// @route   GET /api/v1/video
// @access  Public
videoRouter.get("/", testVideoAPI);

// @desc    Get All Videos
// @route   GET /api/v1/video/get/all
// @access  Public
videoRouter.get("/get/all", /* ValidateToken, */ getAllVideos);

// @desc    Get Video By ID
// @route   GET /api/v1/video/get/by/id/:id
// @access  Public
videoRouter.get("/get/by/id/:id", getVideoById);

// @desc    Add Video
// @route   POST /api/v1/video/add
// @access  Public
videoRouter.post(
  "/add",
  [
    body("video_url", "Enter Valid Video URL").notEmpty(),
    body("client_id", "Enter Valid Client ID").notEmpty(),
    body("start_date"),
    body("end_date"),
    body("show_adv", "Enter Valid Show Add Status").optional().isBoolean(),
  ],
  addVideo
);

// @desc    Update Video
// @route   PUT /api/v1/video/update/:id
// @access  Public
videoRouter.put(
  "/update/:id",
  [
    body("video_url", "Enter Valid Video URL").optional(),
    body("client_id", "Enter Valid Client ID").optional(),
    body("start_date", "Enter Valid Start Date").optional().isISO8601(),
    body("end_date", "Enter Valid End Date").optional().isISO8601(),
    body("show_adv", "Enter Valid Show Add Status").optional().isBoolean(),
  ],
  updateVideo
);

// @desc    Delete Video
// @route   DELETE /api/v1/video/delete/:id
// @access  Public
videoRouter.delete("/delete/:id", deleteVideo);

// @desc    Upload Video
// @route   POST /api/v1/video/upload
// @access  Public
videoRouter.post("/upload", uploadVideo);

module.exports = videoRouter;
