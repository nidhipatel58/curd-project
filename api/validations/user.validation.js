import Joi from "joi";
import User from "../models/user.js";

//Check if email is unique:-
const isEmailUnique = async (email) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use.");
  }
};

//Check if password is unique:-
const isPasswordUnique = async (password) => {
  const existingUser = await User.findOne({ where: { password } });
  if (existingUser) {
    throw new Error("Password already in use.");
  }
};

const user = {
  body: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.base": "Username must be a string.",
      "string.alphanum": "Username must contain only letters and numbers.",
      "string.min": "Username must be at least 3 characters long.",
      "string.max": "Username must be less than 30 characters long.",
      "any.required": "Username is required.",
    }),
    email: Joi.string()
      .email()
      .required()
      .trim()
      .external(isEmailUnique)
      .messages({
        "string.base": "Email must be a valid string.",
        "string.email": "Email must be a valid email address.",
        "any.required": "Email is required.",
        "string.trim": "Email must not contain leading or trailing spaces.",
        "any.external": "Email is already in use.",
      }),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
      .strict()
      .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
      )
      .external(isPasswordUnique)
      .messages({
        "string.base": "Password must be a string.",
        "string.min": "Password must be at least 8 characters long.",
        "string.max": "Password must be less than 255 characters long.",
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        "any.required": "Password is required.",
        "any.external": "Password has already been used.",
      }),
  }),
};

export default { user };
