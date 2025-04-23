const express = require("express");
const { body } = require("express-validator");
const ValidateToken = require("../middleWare/validateToken");
const {
  testRoleTypeAPI,
  GetAllRoleTypes,
  GetRoleTypeByName,
  AddRoleType,
  UpdateRoleType,
  DeleteRoleType,
  GetRoleTypeById,
} = require("../controllers/roleType.js");

const roleTypeRouter = express.Router();

//@desc Test Role_type API
//@route GET /api/v1/role
//@access Public
roleTypeRouter.get("/", testRoleTypeAPI);

//@desc Get All RoleType API
//@route GET role/get/all
//@access Public
roleTypeRouter.get("/get/all", /* ValidateToken, */ GetAllRoleTypes);

//@desc Get RoleType By Name API
//@route GET role/get/by/name
//@access Public
roleTypeRouter.get(
  "/get/by/name",
  [body("name", "Enter Valid Name").notEmpty()],
  GetRoleTypeByName
);

//@desc Add RoleType API
//@route POST role/add
//@access Public
roleTypeRouter.post(
  "/add",
  [
    body("name", "Enter Valid Name").notEmpty(),
    body("value", "Enter Valid Value").notEmpty(),
  ],
  AddRoleType
);

//@desc Update RoleType API
//@route PUT role/update/:id
//@access Public
roleTypeRouter.put(
  "/update/:id",
  [
    body("name", "Enter Valid Name").optional(),
    body("value", "Enter Valid Value").optional(),
    body("active", "Enter Valid Active Status").optional().isBoolean(),
  ],
  UpdateRoleType
);

//@desc Delete RoleType API
//@route DELETE role/delete/:id
//@access Public
roleTypeRouter.delete("/delete/:id", DeleteRoleType);

//@desc Get RoleType By ID API
//@route GET role/get/by/id/:id
//@access Public
roleTypeRouter.get("/get/by/id/:id", GetRoleTypeById);

module.exports = roleTypeRouter;
