import TodoModel from "../../models/todo.model.js";

// Create a new Todo
let CreateTodo = (title, description, userId) => {
  return TodoModel.create({
    title,
    description,
    userId,
  });
};

// GetTodo by id and user id
let GetTodoById = (userId) => {
  return TodoModel.findOne({ where: { userId } });
};

// Update a Todo by id and user id
let UpdateTodo = async (userId, body) => {
  let todo = await TodoModel.findOne({ where: { userId } });
  if (!todo) {
    throw new Error("Todo not found");
  }
  todo.set(body);
  await todo.save();
  return todo;
};

// Delete a Todo by id and user id
let DeleteTodo = async (userId) => {
  let todo = await TodoModel.findOne({ where: { userId } });
  if (!todo) {
    throw new Error("Todo not found");
  }
  await todo.destroy();
  return todo;
};

export default { CreateTodo, GetTodoById, UpdateTodo, DeleteTodo };
