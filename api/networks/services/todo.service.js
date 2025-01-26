import TodoModel from "../../models/todo.js";

// Create a new Todo:-
let CreateTodo = async (title, description, userId) => {
  // console.log({ title, description, userId }, "--------------------");
  let user = TodoModel.create({ title, description, userId });
  return user;
};

// GetTodo by id and user id:-
let GetTodoById =async (id) => {
  try {
    const todo = await TodoModel.findOne({
      where: { id }, 
    });

    if (!todo) {
      console.log(`Todo with id ${id} not found.`);
      return null;
    }

    console.log("Todo details:", todo);
    return todo;
  } catch (error) {
    console.error("Error fetching todo:", error);
  }
};

// Update a Todo by id and user id:-
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

// Delete a Todo by id and user id:-
let DeleteTodo = async (id) => {
  let todo = await TodoModel.findOne({ where: { id } });
  if (!todo) {
    throw new Error("Todo not found");
  }
  await todo.destroy();
  return todo;
};

export default { CreateTodo, GetTodoById, UpdateTodo, DeleteTodo };
