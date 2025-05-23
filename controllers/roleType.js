const logger = require("../config/logger.js");
const { validationResult, matchedData } = require("express-validator");
const RoleType = require("../models/RoleType.js");

const testRoleTypeAPI = async (req, res) => {
  return res.status(200).send("Role_type API test successfull");
};

//@desc Get All RoleType API
//@route GET role_type/getall
//@access Public
const GetAllRoleTypes = async (req, res) => {
  try {
    const allRoles = await RoleType.find({ active: true });
    console.log(allRoles);
    logger.info(
      `: API role_type/getalldepts | responded with "Fetched all the Role_types" `
    );
    return res.status(200).json({ result: allRoles });
  } catch (err) {
    console.log("error: ", err);
    logger.error(
      ` API role_type/getalldepts | responded with Error  " something went wrong" `
    );
    return res
      .status(500)
      .json({ error: err, message: "Something went wrong" });
  }
};

//@desc Get RoleType By Name API
//@route GET role_type/getrole_typebyname
//@access Public
const GetRoleTypeByName = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API role_type/login  responded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);

  try {
    const deptName = await RoleType.findOne({ name: data.name });
    /* console.log(allDepts); */
    logger.info(
      `${ip}: API role_type/getalldepts | responded with "Fetched all the Role_types" `
    );
    return res.status(200).json({ result: deptName });
  } catch (err) {
    logger.error(
      `${ip}: API role_type/getalldepts responded with Error  " somethung went wrong" `
    );
    return res
      .status(500)
      .json({ error: err, message: "Something went wrong" });
  }
};

//@desc Add RoleType API
//@route POST role/add
//@access Public
const AddRoleType = async (req, res) => {
  const { name, value } = req.body;
  try {
    const roleType = new RoleType({ name, value });
    await roleType.save();
    res.status(201).json(roleType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//@desc Update RoleType API
//@route PUT role/update/:id
//@access Public
const UpdateRoleType = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const roleType = await RoleType.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!roleType) {
      return res.status(404).json({ message: "RoleType not found" });
    }
    res.status(200).json(roleType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//@desc Delete RoleType API
//@route DELETE role/delete/:id
//@access Public
const DeleteRoleType = async (req, res) => {
  const { id } = req.params;
  try {
    const roleType = await RoleType.findByIdAndUpdate(id, {
      active: false,
    });
    if (!roleType) {
      return res.status(404).json({ message: "RoleType not found" });
    }
    res.status(200).json({ message: "RoleType deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//@desc Get RoleType By ID API
//@route GET role/get/by/id/:id
//@access Public
const GetRoleTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const roleType = await RoleType.findById(id);
    if (!roleType) {
      return res.status(404).json({ message: "RoleType not found" });
    }
    res.status(200).json(roleType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  testRoleTypeAPI,
  GetAllRoleTypes,
  GetRoleTypeByName,
  AddRoleType,
  DeleteRoleType,
  GetRoleTypeById,
  DeleteRoleType,
  UpdateRoleType,
};
