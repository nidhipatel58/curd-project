import express from "express";
const route = express.Router();
import { UserController } from "../networks/controller/index.js";
import verifyToken from "../middleware/verifyauth.js";

route.post("/register", UserController.createUser);
route.get("/usersall", UserController.getAllUser);
route.get("/getuser/:id", verifyToken, UserController.getUserById);
route.put("/updateuser/:id", verifyToken, UserController.updateUser);
route.delete("/deleteuser/:id", verifyToken, UserController.deleteUser);

// Login & Signup:
//route.post("/signup", UserController.signup);
route.post("/login", UserController.Login);

export default route;
