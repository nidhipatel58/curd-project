import express from "express";
import TodoController from "../networks/controller/todo.controller.js";
import verifyToken from "../middleware/verifyauth.js";

const route = express.Router();

route.post("/create", verifyToken, TodoController.CreateTodo);
route.get("/gettodo/:id", verifyToken, TodoController.GetTodoById);
route.delete("/deletetodo", verifyToken, TodoController.DeleteTodo);
route.put("/updatetodo", verifyToken, TodoController.UpdateTodo);

export default route;
