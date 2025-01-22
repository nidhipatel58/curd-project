import TodoService from "../services/todo.service.js";

// Create todos
const CreateTodo = async (req, res) => {
  const { title, description, userId } = req.body;
  // console.log(req.body, "=========");

  if (!title || !description || !userId) {
    return res
      .status(400)
      .json({ message: "Title , Description or userId is required!" });
  }

  const todo = await TodoService.CreateTodo(title, description, userId);
  res.status(201).json({
    message: "Todo created successfully",
    todo,
  });
};

// Get single todo by ID
const GetTodoById = async (req, res) => {
  try {
    const todo = await TodoService.GetTodoById(req.userId);
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized access" });
    }
    res.status(200).json({
      message: "Todo fetched successfully",
      todo,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete todo by ID
const DeleteTodo = async (req, res) => {
  try {
    const todo = await TodoService.DeleteTodo(req.userId);
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized access" });
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
    const body = req.body;
    const todo = await TodoService.UpdateTodo(req.userId, body);
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized access" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { CreateTodo, GetTodoById, DeleteTodo, UpdateTodo };
