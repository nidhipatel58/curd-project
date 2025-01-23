"use strict";

import { Sequelize, DataTypes } from "sequelize";
import db from "../models/index.js";

const TodoModel = (sequelize) => {
  const Todo = sequelize.define(
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

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Todo;
};

export default TodoModel;
