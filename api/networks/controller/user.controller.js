import createToken from "../../middleware/auth.js";
import UserService from "../services/user.service.js";
import bcrypt from "bcryptjs";

// Register Users:
const createUser = async (req, res) => {
  try {
    let { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let userData = { email, password: hashedPassword, username };

    let user = await UserService.createUser(userData);
    res.status(201).json({
      message: "User Created Successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// Get user by ID:
const getUserById = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await UserService.getUserById(id);
    if (!user) {
      throw new Error("User not found");
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

// Get All Users:
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

// Update user by ID:
const updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    let updates = req.body;
    console.log("Update id", id, "and data", updates);

    const user = await UserService.updateUser(id, updates);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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

// Delete user by ID:
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserService.deleteUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Signup:
const signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await UserService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user:-
    const newUser = await UserService.createUser({
      email,
      password: hashedPassword,
      username,
    });

    res.status(201).json({
      message: "User registered successfully",
      newUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Login user:
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await UserService.findUserByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed: User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Authentication failed: Invalid password" });
    }

    // Generate token
    let token = createToken({ userId: user.id, username: user.username });
    console.log("Generated token", token);

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

export {
  createUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  signup,
  Login,
};
