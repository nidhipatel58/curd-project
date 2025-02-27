import TodoService from "../services/todo.service.js";
import UserService from "../services/user.service.js";

// Create todos
const CreateTodo = async (req, res) => {
  const { title, description } = req.body;
  console.log(req.body, "========= todo params");

  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const todo = await TodoService.CreateTodo(title, description, req.userId);
  res.status(200).json({
    message: "Todo created successfully",
    todo,
  });
};

const GetTodo = async (req, res) => {
  try {
    const userId = req.userId;
    const todo = await TodoService.GetTodo(userId);

    if (!todo) {
      return res.status(400).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo fetched successfully",
      todo,
    });
  } catch (err) {
    console.error("Error in GetTodoById:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetTodoByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserService.getUser(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Todo not found for this user id" });
    } else {
      const todo = await TodoService.GetTodo(userId);
      if (!todo) {
        return res.status(400).json({ message: "Todo not found" });
      } else {
        res.status(200).json({
          message: "Todo fetched successfully",
          todo,
        });
      }
    }
  } catch (err) {
    console.error("Error in GetTodoById:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete todo by ID
const DeleteTodo = async (req, res) => {
  try {
    let { id } = req.params;
    const todo = await TodoService.DeleteTodo(id);
    if (!todo) {
      return res.status(400).json({ message: "Todo not found" });
    }
    res.status(200).json({
      message: "Todo deleted successfully",
      todo,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update todo by ID
const UpdateTodo = async (req, res) => {
  try {
    let { id } = req.params;
    const body = req.body;
    console.log("----------------", id);

    const todo = await TodoService.UpdateTodo(id, body);
    if (!todo) {
      return res.status(400).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { CreateTodo, GetTodo, GetTodoByUserId, DeleteTodo, UpdateTodo };
