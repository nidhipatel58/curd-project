import sequelize from "../config/db.js";
import UserModel from "../models/user.model.js";

// Users CRUD Queries:-
let usersQueries = {
  // Create User:-
  createUser: async (userData) => {
    let newData = await UserModel.create(userData);
    return newData;
    // const { username, email, password } = userData;
    // const result = await sequelize.query(
    //   `INSERT INTO users (username, email, password)
    //    VALUES ($1, $2, $3) RETURNING *;`,
    //   {
    //     bind: [username, email, password],
    //     type: sequelize.QueryTypes.INSERT,
    //   }
    // );
    // return result[0];
  },

  // Get All Users:-
  getAllUser: async () => {
    // const [result] = await sequelize.query(`SELECT * FROM users;`, {
    //   type: sequelize.QueryTypes.SELECT,
    // });
    // console.log("result", result);
    // return result;

    let users = await UserModel.findAll();
    return users;
  },

  // Get User by ID:-
  getUserById: async (id) => {
    // const result = await sequelize.query(
    //   `SELECT * FROM users WHERE id = $1;`,
    //   {
    //     bind: [id],
    //     type: sequelize.QueryTypes.SELECT,
    //   }
    // );
    // return result[0];

    const user = await UserModel.findByPk(id);
    return user;
  },

  // Update User:-
  updateUser: async (id) => {
    // const { username, email, password } = updates;

    // const [result] = await sequelize.query(
    //   `UPDATE users
    //    SET username = $1, email = $2, password = $3
    //    WHERE id = $4 RETURNING *;`,
    //   {
    //     bind: [username, email, password, id],
    //     type: sequelize.QueryTypes.UPDATE,
    //   }
    // );
    let user = await UserModel.findByPk(id);
    Object.assign(user);
    // await user.save();
    return user;
  },

  // Delete User:-
  deleteUser: async (id) => {
    // const result = await sequelize.query(
    //   `DELETE FROM users WHERE id = $1 RETURNING *;`,
    //   {
    //     bind: [id],
    //     type: sequelize.QueryTypes.DELETE,
    //   }
    // );
    // return result[0];

    let users = await UserModel.findByPk(id);
    await users.destroy();
    return { message: "User deleted successfully", users };
  },

  findUserByEmail: async (email) => {
    // const result = await sequelize.query(
    //   `SELECT * FROM users WHERE email = $1;`,
    //   {
    //     bind: [email],
    //     type: sequelize.QueryTypes.SELECT,
    //   }
    // );
    // return result[0];

    let users = await UserModel.findOne({ where: { email } });
    return users;
  },
};

export default usersQueries;
