import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/db.js";

// Define the User model
const User = sequelize.define(
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
      validate: {
        len: [3, 30],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 255],
          msg: "Password must be between 8 and 255 characters.",
        },
      },
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

// Compare Password
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default User;
