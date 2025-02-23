import TodoModel from "../../models/todo.js";

// Create a new Todo
let CreateTodo = async (title, description, userId) => {
  // console.log({ title, description,}, "--------------------");
  return await TodoModel.create({ title, description, userId });
};

// GetTodo by id and user id
let GetTodo = async (userId) => {
  let user = await TodoModel.findAll({ where: { userId } });
  if (!user) {
    throw new Error("Todo not found");
  }
  return user;
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

export default { CreateTodo, GetTodo, UpdateTodo, DeleteTodo };
