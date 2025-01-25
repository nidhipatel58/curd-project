import express from "express";
import TodoController from "../networks/controller/todo.controller.js";
import verifyToken from "../middleware/verifyauth.js";
import TodoValidation from "../validations/todo.validation.js";
import validate from "../middleware/validate.js";
const route = express.Router();

route.post(
  "/create",
  validate(TodoValidation.todo),
  verifyToken,
  TodoController.CreateTodo
);
route.get(
  "/gettodo/:id",
  validate(TodoValidation.todo),
  verifyToken,
  TodoController.GetTodoById
);
route.delete(
  "/deletetodo/:id",
  validate(TodoValidation.todo),
  verifyToken,
  TodoController.DeleteTodo
);
route.put(
  "/updatetodo/:id",
  validate(TodoValidation.todo),
  verifyToken,
  TodoController.UpdateTodo
);

export default route;
