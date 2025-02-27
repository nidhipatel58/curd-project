import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Todo.css";
import { handleError, handleSuccess } from "../../utils/utils";
import ValidationError from "../../Validation/ValidationError";
import TodoTable from "./TodoTable";
import { getTodo, createTodo, deleteTodo, updateTodo } from "../../api/todo";
import { Modal, Button } from "react-bootstrap";
import ButtonComponent from "../Button/Button.component";
import ResponseHandler from "../../api/ResponseHandler/ResponseHandler";

function Todo() {
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [todoArray, setTodoArray] = useState([]);
  const [error, setError] = useState("");
  const [toBeUpdate, setToBeUpdate] = useState(null);
  const navigate = useNavigate();
  const Token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchTodos = async () => {
        try {
          const response = await getTodo();
          let data = response.data.todo;
          if (data.length != 0) {
            setTodoArray(response.data.todo || []);
          }
        } catch (err) {
          ResponseHandler.error(err);
        }
      };
      fetchTodos();
    } else {
      handleError("Please login first");
    }
  }, [userId, Token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const submitTodo = async () => {
    const { title, description } = inputs;
    if (!ValidationError.isTodoValidate(title, description, setError)) {
      return;
    }
    if (isUpdating) {
      try {
        await updateTodo(`${updateId}`, { title, description });
        handleSuccess("Todo updated successfully");
        setTodoArray((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === updateId ? { ...todo, title, description } : todo
          )
        );
      } catch (err) {
        ResponseHandler.error(err);
      }
    } else {
      try {
        const response = await createTodo({ title, description });
        handleSuccess("Todo created successfully");
        setTodoArray([...todoArray, response.data.todo]);
        setInputs({ title: "", description: "" });
      } catch (err) {
        ResponseHandler.error(err);
      }
    }

    setInputs({ title: "", description: "" });
    setIsUpdating(false);
    setUpdateId(null);
  };

  const clearInputs = () => {
    setInputs({ title: "", description: "" });
    setIsUpdating(false);
    setUpdateId(null);
  };

  // Update Specific todo on Same Page:-
  const handleUpdate = (todo) => {
    setInputs({ title: todo.title, description: todo.description });
    setIsUpdating(true);
    setUpdateId(todo.id);
  };


  // Update Todo on another page:-
  const updateTodo = (todo) => {
    // handleSuccess("todo call");
    // const selectedTodo = todoArray[index];
    // navigate("/updatetodo", {
    //   state: {
    //     todoid: selectedTodo.id,
    //     title: selectedTodo.title,
    //     description: selectedTodo.description,
    //   },
    // });
    setInputs({ title: todo.title, description: todo.description });
    setIsUpdating(true);
    setUpdateId(todo.id);
  };


  const confirmDelete = (todoId) => {
    setDeleteTodoId(todoId);
    setShowConfirmDialog(true);
  };

  const handleDelete = async () => {
    if (deleteTodoId) {
      try {
        await deleteTodo(`${deleteTodoId}`);
        handleSuccess("Todo deleted successfully");
        setTodoArray(todoArray.filter((item) => item.id !== deleteTodoId));
      } catch (err) {
        ResponseHandler.error(err);
      }
      setShowConfirmDialog(false);
    }
  };

  return (
    <>
      <div className="todo">
        <div className="center-container">
          <div className="row">
            <div className="col-lg-4">
              <div className="todo-card">
                <h6 className="todo-form-title">
                  {isUpdating ? "Update Todo" : "Create New Todo"}
                </h6>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  className="form-input"
                  value={inputs.title}
                  onChange={handleChange}
                />
                <textarea
                  name="description"
                  placeholder="Enter description"
                  className="form-input"
                  value={inputs.description}
                  onChange={handleChange}
                />
                {error && <span className="error">{error}</span>}
                <div className="button-group">
                  <ButtonComponent
                    className="btn-clear"
                    onClick={clearInputs}
                    text="Clear"
                    disabled={!inputs.title && !inputs.description}
                  />
                  <button
                    className="btn-submit"
                    onClick={submitTodo}
                    disabled={!inputs.title || !inputs.description}
                    style={{
                      cursor:
                        !inputs.title || !inputs.description
                          ? "not-allowed"
                          : "pointer",
                      opacity: !inputs.title || !inputs.description ? 0.4 : 1,
                    }}
                  >
                    {isUpdating ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="todo-card">
                <h6 className="todo-form-title">#Your todos</h6>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todoArray.length > 0 ? (
                        todoArray.map((item, index) => (
                          <TodoTable
                            key={item.id || index}
                            Title={item.title}
                            Description={item.description}
                            id={item.id}
                            updateId={index}
                            handleDelete={confirmDelete}
                            toBeUpdate={() => updateTodo(item)}
                          // handleUpdate={() => updateTodo}
                          />
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" style={{ textAlign: "center" }}>
                            No data avaiable
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showConfirmDialog}
        onHide={() => setShowConfirmDialog(false)}
        centered
      >
        <Modal.Body>
          <p>Are you sure you want to delete this ToDo?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmDialog(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Todo;
