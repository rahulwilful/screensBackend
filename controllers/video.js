const logger = require('../config/logger.js');
const { validationResult, matchedData } = require('express-validator');
const Video = require('../models/Video.js');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const cloud_name = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloud_name,
  api_key: API_KEY,
  api_secret: API_SECRET
});

const testVideoAPI = async (req, res) => {
  return res.status(200).send('Video API test successful');
};

// @desc    Get All Videos
// @route   GET /api/v1/video/get/all
// @access  Public
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    logger.info('API video/get/all | Fetched all videos');
    return res.status(200).json({ result: videos });
  } catch (err) {
    logger.error(`API video/get/all | Error: ${err}`);
    return res.status(500).json({ error: err, message: 'Something went wrong' });
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
      return res.status(404).json({ message: 'Video not found' });
    }
    logger.info(`API video/get/by/id/${id} | Fetched video by ID`);
    return res.status(200).json({ result: video });
  } catch (err) {
    logger.error(`API video/get/by/id/${id} | Error: ${err}`);
    return res.status(500).json({ error: err, message: 'Something went wrong' });
  }
};

// @desc    Get Videos By Location ID
// @route   GET /api/v1/video/get/by/location/id/:locationId
// @access  Public
const getVideosByLocationId = async (req, res) => {
  const { locationId } = req.params;
  try {
    const videos = await Video.find({ location_id: locationId }, { secure_url: 1, public_url: 1, public_id: 1, client_id: 1 });
    if (!videos.length) {
      return res.status(404).json({ message: 'Videos not found' });
    }
    logger.info(`API video/get/by/location/id/${locationId} | Fetched videos by location ID`);
    return res.status(200).json({ result: videos });
  } catch (err) {
    logger.error(`API video/get/by/location/id/${locationId} | Error: ${err}`);
    return res.status(500).json({ error: err, message: 'Something went wrong' });
  }
};

// @desc    Add Video
// @route   POST /api/v1/video/add
// @access  Public
const addVideo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('API video/add | Validation Error');
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);
  try {
    const video = new Video(data);
    await video.save();
    logger.info('API video/add | Video added successfully');
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
      return res.status(404).json({ message: 'Video not found' });
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
      return res.status(404).json({ message: 'Video not found' });
    }
    logger.info(`API video/delete/${id} | Video deleted successfully`);
    return res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    logger.error(`API video/delete/${id} | Error: ${err}`);
    return res.status(400).json({ message: err.message });
  }
};

// @desc    Upload Video
// @route   POST /api/v1/video/upload
// @access  Public
const uploadVideo = async (req, res) => {
  console.log('req: ', req);

  const data = matchedData(req);

  try {
    // Use multer to handle the file upload
    upload.single('media')(req, res, async err => {
      if (err) {
        logger.error('API video/upload | Error uploading file: ' + err);
        return res.status(400).json({ message: err.message });
      }

      const media = req.file.path; // Path to the uploaded file

      // Upload the file to Cloudinary
      cloudinary.uploader.upload(media, { resource_type: 'video' }, (error, result) => {
        // Delete the temporary file uploaded by multer
        fs.unlinkSync(media);

        if (error) {
          logger.error('API video/upload | Error uploading to Cloudinary: ' + error);
          return res.status(500).json({
            error: error.message,
            message: 'Something went wrong while uploading media'
          });
        } else {
          console.log('result: ', result);

          const video = Video.create({
            secure_url: result.secure_url,
            public_url: result.url,
            public_id: result.public_id,
            client_id: req.body.client_id,
            location_id: req.body.location_id,
            start_date: req.body.start_date,
            end_date: req.body.end_date
          });
          logger.info('API video/upload | Video uploaded successfully');
          return res.status(201).json({ video });
        }
      });
    });
  } catch (err) {
    logger.error('API video/upload | Error: ' + err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  testVideoAPI,
  getAllVideos,
  getVideoById,
  getVideosByLocationId,
  addVideo,
  updateVideo,
  deleteVideo,
  uploadVideo
};
