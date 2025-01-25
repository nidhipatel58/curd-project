import Joi from "joi";
import Todo from "../models/todo.js";

// Function For Check uniqueness:-
const isUnique = async (field, value) => {
  const existingTodo = await Todo.findOne({
    where: { [field]: value },
  });
  if (existingTodo) {
    throw new Error(`${field} must be unique.`);
  }
};

const todo = {
  body: Joi.object().keys({
    userId: Joi.number().integer().required().messages({
      "number.base": "User ID must be a number.",
      "any.required": "User ID is required.",
    }),
    title: Joi.string()
      .min(3)
      .max(255)
      .required()
      .custom(async (value, helpers) => {
        await isUnique("title", value);
        return value;
      })
      .messages({
        "string.base": "Title must be a string.",
        "string.min": "Title must be at least 3 characters long.",
        "string.max": "Title must be less than 255 characters.",
        "any.required": "Title is required.",
      }),
    description: Joi.string()
      .max(500)
      .optional()
      .custom(async (value, helpers) => {
        if (value) await isUnique("description", value);
        return value;
      })
      .messages({
        "string.base": "Description must be a string.",
        "string.max": "Description must be less than 500 characters.",
      }),
    isCompleted: Joi.boolean().optional().messages({
      "boolean.base": "isCompleted must be a boolean.",
    }),
  }),
};

export default todo;
