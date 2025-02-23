import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Todo.css";
import { handleError, handleSuccess } from "../../utils/utils";
import axios from "axios";
import ValidationError from "../../Validation/ValidationError";
import TodoTable from "./TodoCards";
import UpdateTodo from "./Updatetodo";
import { Modal, Button } from "react-bootstrap";

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

  useEffect(() => {
    if (userId) {
      const fetchTodos = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3006/api/todos/gettodo`,
            {
              headers: { Authorization: `Bearer ${Token}` },
            }
          );
          let data = response.data.todo;
          if (data.length != 0) {
            setTodoArray(response.data.todo || []);
          } else {
            handleError("Todo not found");
          }
        } catch (err) {
          handleError(err.response.data.message);
        }
      };
      fetchTodos();
    } else {
      handleError("Please Signup First!");
    }
  }, [userId, Token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const submitTodo = async (e) => {
    e.preventDefault();
    const { title, description } = inputs;
    if (!ValidationError.isTodoValidate(title, description, setError)) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3006/api/todos/create",
        { title, description },
        { headers: { Authorization: `Bearer ${Token}` } }
      );
      handleSuccess("Todo Created Successfully!");
      setTodoArray([...todoArray, response.data.todo]);
      setInputs({ title: "", description: "" });
    } catch (error) {
      handleError("Error creating todo");
    }
  };

  const clearInputs = () => {
    setInputs({ title: "", description: "" });
  };

  // Update Specific todo:-
  const updateTodo = (index) => {
    handleSuccess("todo call")
    const selectedTodo = todoArray[index];
    navigate("/updatetodo", {
      state: {
        todoid: selectedTodo.id,
        title: selectedTodo.title,
        description: selectedTodo.description,
        userId: userId,
      },
    });
  };

  const confirmDelete = (todoId) => {
    setDeleteTodoId(todoId);
    setShowConfirmDialog(true);
  };

  const handleDelete = async () => {
    if (deleteTodoId) {
      try {
        await axios.delete(
          `http://localhost:3006/api/todos/deletetodo/${deleteTodoId}`,
          {
            headers: { Authorization: `Bearer ${Token}` },
          }
        );
        handleSuccess("Todo Deleted Successfully!");
        setTodoArray(todoArray.filter((item) => item.id !== deleteTodoId));
      } catch (err) {
        handleError(err.response.data.message);
      }
      setShowConfirmDialog(false);
    }
  };

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="center-container">
          <div className="row">
            <div className="col-lg-4">
              <div className="todo-card">
                <h6 className="todo-form-title">Create new todo</h6>
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
                  <button className="btn-clear" onClick={clearInputs}>
                    Clear
                  </button>
                  <button className="btn-submit" onClick={submitTodo}>
                    Add
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
                            toBeUpdate={()=>updateTodo(index)}
                          />
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" style={{ textAlign: "center" }}>
                            No Todos Added
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
