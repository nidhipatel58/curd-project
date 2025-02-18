"use strict";
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// Define the User model using sequelize.define
const UserModel = sequelize.define(
  "User",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

// Compare Password
// UserModel.prototype.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

export default UserModel;
