"use strict";
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const TodoModel = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "todos",
    timestamps: true,
  }
);

TodoModel.associate = (models) => {
  TodoModel.belongsTo(models.User, { foreignKey: "userId" });
};

export default TodoModel;
