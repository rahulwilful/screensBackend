const express = require("express");
const { body, param, validationResult } = require("express-validator");
const {
  addLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
  addFloor,
  getFloorById,
  updateFloor,
  deleteFloor,
} = require("../controllers/location");

const locationRouter = express.Router();

// @desc    Add Location
// @route   POST /api/v1/location/add
// @access  Public
locationRouter.post(
  "/add",
  [
    body("location_name").notEmpty().withMessage("Location name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("zip_code").notEmpty().withMessage("Zip code is required"),
    body("state").notEmpty().withMessage("State is required"),
  ],
  addLocation
);

// @desc    Get All Locations
// @route   GET /api/v1/location/get/all
// @access  Public
locationRouter.get("/get/all", getAllLocations);

// @desc    Get Location By ID
// @route   GET /api/v1/location/get/by/id/:id
// @access  Public
locationRouter.get(
  "/get/by/id/:id",
  [param("id").isMongoId().withMessage("Invalid location ID")],
  getLocationById
);

// @desc    Update Location
// @route   PUT /api/v1/location/update/:id
// @access  Public
locationRouter.put(
  "/update/:id",
  [
    param("id").isMongoId().withMessage("Invalid location ID"),
    body("location_name")
      .optional()
      .notEmpty()
      .withMessage("Location name is required"),
    body("city").optional().notEmpty().withMessage("City is required"),
    body("zip_code").optional().notEmpty().withMessage("Zip code is required"),
    body("state").optional().notEmpty().withMessage("State is required"),
  ],
  updateLocation
);

// @desc    Delete Location
// @route   DELETE /api/v1/location/delete/:id
// @access  Public
locationRouter.delete(
  "/delete/:id",
  [param("id").isMongoId().withMessage("Invalid location ID")],
  deleteLocation
);

// @desc    Add Floor to Location
// @route   POST /api/v1/location/:locationId/floor/add
// @access  Public
locationRouter.post(
  "/:locationId/floor/add",
  [
    param("locationId").isMongoId().withMessage("Invalid location ID"),
    body("floor_name").notEmpty().withMessage("Floor name is required"),
  ],
  addFloor
);

// @desc    Get Floor By ID
// @route   GET /api/v1/location/:locationId/floor/:floorId
// @access  Public
locationRouter.get(
  "/:locationId/floor/:floorId",
  [
    param("locationId").isMongoId().withMessage("Invalid location ID"),
    param("floorId").isMongoId().withMessage("Invalid floor ID"),
  ],
  getFloorById
);

// @desc    Update Floor
// @route   PUT /api/v1/location/:locationId/floor/:floorId
// @access  Public
locationRouter.put(
  "/:locationId/floor/:floorId",
  [
    param("locationId").isMongoId().withMessage("Invalid location ID"),
    param("floorId").isMongoId().withMessage("Invalid floor ID"),
    body("floor_name")
      .optional()
      .notEmpty()
      .withMessage("Floor name is required"),
  ],
  updateFloor
);

// @desc    Delete Floor
// @route   DELETE /api/v1/location/:locationId/floor/:floorId
// @access  Public
locationRouter.delete(
  "/:locationId/floor/:floorId",
  [
    param("locationId").isMongoId().withMessage("Invalid location ID"),
    param("floorId").isMongoId().withMessage("Invalid floor ID"),
  ],
  deleteFloor
);

module.exports = locationRouter;
