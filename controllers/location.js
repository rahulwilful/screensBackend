const Location = require("../models/Location"); // Assuming your Location model is in the models folder

const testUserAPI = async (req, res) => {
  return res.status(200).send("User API test successfull");
};

// @desc    Add Location
// @route   POST /api/v1/location/add
// @access  Public
const addLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get All Locations
// @route   GET /api/v1/location/get/all
// @access  Public
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get Location By ID
// @route   GET /api/v1/location/get/by/id/:id
// @access  Public
const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update Location
// @route   PUT /api/v1/location/update/:id
// @access  Public
const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json(location);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete Location
// @route   DELETE /api/v1/location/delete/:id
// @access  Public
const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true } // This option returns the modified document rather than the original
    );

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({ message: "Location deactivated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add Floor to Location
// @route   POST /api/v1/location/:locationId/floor/add
// @access  Public
const addFloor = async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationId);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    location.floors.push(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get Floor By ID
// @route   GET /api/v1/location/:locationId/floor/:floorId
// @access  Public
const getFloorById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationId);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    const floor = location.floors.id(req.params.floorId);
    if (!floor) {
      return res.status(404).json({ message: "Floor not found" });
    }
    res.status(200).json(floor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update Floor
// @route   PUT /api/v1/location/:locationId/floor/:floorId
// @access  Public
const updateFloor = async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationId);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    const floor = location.floors.id(req.params.floorId);
    if (!floor) {
      return res.status(404).json({ message: "Floor not found" });
    }
    Object.assign(floor, req.body);
    await location.save();
    res.status(200).json(floor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete Floor
// @route   DELETE /api/v1/location/:locationId/floor/:floorId
// @access  Public
const deleteFloor = async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationId);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    const floor = location.floors.id(req.params.floorId);
    if (!floor) {
      return res.status(404).json({ message: "Floor not found" });
    }
    floor.remove();
    await location.save();
    res.status(200).json({ message: "Floor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
  addFloor,
  getFloorById,
  updateFloor,
  deleteFloor,
};
