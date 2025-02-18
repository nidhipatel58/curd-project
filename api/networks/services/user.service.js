import usersQuerie from "../../queries/users.querie.js";


// Create Users:
let createUser = async (userData) => {
  let newUser = await usersQuerie.createUser(userData);
  return newUser;
};

// Get All Users:-
const getAllUser = async () => {
  let users = await usersQuerie.getAllUser();
  return users;
};

// Get user by ID:-
const getUserById = async (id) => {
  const user = await usersQuerie.getUserById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

// Find a user by email::-
const findUserByEmail = async (email) => {
  const user = await usersQuerie.findUserByEmail(email);
  console.log("find by email", email);
  return user;
};

// Update user by ID:-
const updateUser = async (id, updates) => {
  const updatedUser = await usersQuerie.updateUser(id, updates);
  if (!updatedUser) {
    throw new Error("User not found");
  }
  return updatedUser;
};

// Delete user by ID:-
const deleteUser = async (id) => {
  const deletedUser = await usersQuerie.deleteUser(id);
  return deletedUser;
};

export default {
  createUser,
  getUserById,
  updateUser,
  getAllUser,
  findUserByEmail,
  deleteUser,
};
