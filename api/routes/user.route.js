import express from "express";
const route = express.Router();
import { UserController } from "../networks/controller/index.js";
import validate from "../middleware/validate.js";
import UserValidation from "../validations/index.js";
import verifyToken from "../middleware/verifyauth.js";

route.post(
  "/register",
  validate(UserValidation.user),
  UserController.createUser
);
route.get(
  "/usersall",
  validate(UserValidation.user),
  UserController.getAllUser
);
route.get(
  "/getuser/:id",
  validate(UserValidation.user),
  verifyToken,
  UserController.getUserById
);
route.put(
  "/updateuser/:id",
  validate(UserValidation.user),
  verifyToken,
  UserController.updateUser
);
route.delete(
  "/deleteuser/:id",
  validate(UserValidation.user),
  verifyToken,
  UserController.deleteUser
);

// Login:
route.post("/login", validate(UserValidation.user), UserController.Login);

export default route;
