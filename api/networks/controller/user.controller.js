import createToken from "../../middleware/auth.js";
import UserModel from "../../models/user.js";
import UserService from "../services/user.service.js";
import bcrypt from "bcryptjs";

// Register Users:
const createUser = async (req, res) => {
  let { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  let registerData = {
    username: username,
    email: email,
    password: hashedPassword,
  };

  const user = await UserService.createUser(registerData);
  if (user != null) {
    res.status(201).json({
      message: "User Created Successfully",
      user,
    });
  } else {
    return res.status(400).json({ message: "User e-mail already exists" });
  }
};

// Get user by ID:-
const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    const username = req.username;
    console.log(userId, "token based userId"); //
    console.log(username, "token based username"); //

    const user = await UserService.getUser(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// Get All Users:-
const getAllUser = async (req, res) => {
  try {
    let users = await UserService.getAllUser();
    res.status(200).json({
      message: "All users fetched successfully",
      users,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// Update user by ID:-
const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    let updates = req.body;
    console.log("Update id", userId, "and data", updates);

    const user = await UserService.updateUser(userId, updates);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// Delete user by ID:-
const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserService.deleteUser(userId);

    console.log("Update id", userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Login:-
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserService.findUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Unauthorized user: User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Authentication failed: Invalid password" });
    }

    let token = createToken({ userId: user.id, username: user.username });
    res.status(200).json({
      message: "Authentication successful",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { createUser, getAllUser, getUser, deleteUser, updateUser, Login };
