import TodoModel from "../../models/todo.model.js";

// Create a new Todo
let CreateTodo = async (title, description, userId) => {
  // console.log({ title, description, userId }, "--------------------");
  return await TodoModel.create({ title, description, userId });
};

// GetTodo by id and user id
let GetTodoById = (userId) => {
  return TodoModel.findOne({ where: { userId } });
};

// Update a Todo by id and user id
let UpdateTodo = async (id, body) => {
  let todo = await TodoModel.findOne({ where: { id } });
   console.log(id, "todo userId");

  if (!todo) {
    throw new Error("Todo not found");
  }
  todo.set(body);
  await todo.save();
  return todo;
};

// Delete a Todo by id and user id
let DeleteTodo = async (id) => {
  let todo = await TodoModel.findOne({ where: { id } });
  if (!todo) {
    throw new Error("Todo not found");
  }
  await todo.destroy();
  return todo;
};

export default { CreateTodo, GetTodoById, UpdateTodo, DeleteTodo };
