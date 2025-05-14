const logger = require("../config/logger.js");
const { validationResult, matchedData } = require("express-validator");
const Video = require("../models/Video.js");

const testVideoAPI = async (req, res) => {
  return res.status(200).send("Video API test successful");
};

// @desc    Get All Videos
// @route   GET /api/v1/video/get/all
// @access  Public
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    logger.info("API video/get/all | Fetched all videos");
    return res.status(200).json({ result: videos });
  } catch (err) {
    logger.error(`API video/get/all | Error: ${err}`);
    return res
      .status(500)
      .json({ error: err, message: "Something went wrong" });
  }
};

// @desc    Get Video By ID
// @route   GET /api/v1/video/get/by/id/:id
// @access  Public
const getVideoById = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    logger.info(`API video/get/by/id/${id} | Fetched video by ID`);
    return res.status(200).json({ result: video });
  } catch (err) {
    logger.error(`API video/get/by/id/${id} | Error: ${err}`);
    return res
      .status(500)
      .json({ error: err, message: "Something went wrong" });
  }
};

// @desc    Add Video
// @route   POST /api/v1/video/add
// @access  Public
const addVideo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error("API video/add | Validation Error");
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);
  try {
    const video = new Video(data);
    await video.save();
    logger.info("API video/add | Video added successfully");
    return res.status(201).json(video);
  } catch (err) {
    logger.error(`API video/add | Error: ${err}`);
    return res.status(400).json({ message: err.message });
  }
};

// @desc    Update Video
// @route   PUT /api/v1/video/update/:id
// @access  Public
const updateVideo = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const video = await Video.findByIdAndUpdate(id, updates, { new: true });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    logger.info(`API video/update/${id} | Video updated successfully`);
    return res.status(200).json(video);
  } catch (err) {
    logger.error(`API video/update/${id} | Error: ${err}`);
    return res.status(400).json({ message: err.message });
  }
};

// @desc    Delete Video
// @route   DELETE /api/v1/video/delete/:id
// @access  Public
const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findByIdAndDelete(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    logger.info(`API video/delete/${id} | Video deleted successfully`);
    return res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    logger.error(`API video/delete/${id} | Error: ${err}`);
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  testVideoAPI,
  getAllVideos,
  getVideoById,
  addVideo,
  updateVideo,
  deleteVideo,
};
