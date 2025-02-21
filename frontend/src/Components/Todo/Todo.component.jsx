import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Todo.css";
import { handleError, handleSuccess } from "../../utils/utils";
import axios from "axios";
// import Update from "./Update";
// import ButtonComponent from "../Button/Button.component";
import ValidationError from "../../Validation/ValidationError";
let Token = localStorage.getItem("token");
let id = localStorage.getItem("id");

function Todo() {
  const [Inputs, setInputs] = useState({ title: "", description: "" });
  const [Array, setArray] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTodos = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3006/api/todos/gettodo/${id}`,
            {
              headers: { Authorization: `Bearer ${Token}` },
            }
          );
          setArray(response.data.todo);
        } catch (error) {
          handleError("Error fetching todos");
        }
      };
      fetchTodos();
    } else {
      handleError("Please Signup First!");
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const Submit = async (e) => {
    e.preventDefault();
    const { title, description } = Inputs;
    if (!ValidationError.isTodoValidate(title, description, setError)) {
      return;
    }
    try {
      let response = await axios.post(
        "http://localhost:3006/api/todos/create",
        { title, description },
        { headers: { Authorization: `Bearer ${Token}` } }
      );
      handleSuccess("Todo Created Successfully!");
      console.log(response.data);
      setArray([...Array, { title, description }]);
      setInputs({ title: "", description: "" });
    } catch (error) {
      handleError("Error creating todo");
    }
  };
  const Clear = () => {
    setInputs({ title: "", description: "" });
  };

  const handleDelete = async (id) => {
    if (id) {
      try {
        let res = await axios.delete(
          `http://localhost:3006/api/todos/deletetodo/${id}`,
          {
            headers: { Authorization: `Bearer ${Token}` },
          }
        );
        handleSuccess("Todo Deleted Successfully!");
        console.log(res.data);
        setArray(Array.filter((item) => item.id !== id));
      } catch (error) {
        handleError("Error deleting todo");
      }
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
                  value={Inputs.title}
                  onChange={handleChange}
                />
                <textarea
                  name="description"
                  placeholder="Enter description"
                  className="form-input"
                  value={Inputs.description}
                  onChange={handleChange}
                />
                {error && <span className="error">{error}</span>}
                <div className="button-group">
                  <button className="btn-clear" onClick={Clear}>
                    Clear
                  </button>
                  <button className="btn-submit" onClick={Submit}>
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
                      {Array.length > 0 ? (
                        Array.map((todo, index) => (
                          <tr key={todo.id}>
                            <td>{index + 1}</td>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td className="action-cell">
                              <button
                                className="action-btn update-btn"
                                onClick={() => navigate("/updatetodo")}
                              >
                                Update
                              </button>
                              <button
                                className="action-btn delete-btn"
                                onClick={() => handleDelete(todo.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
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
    </>
  );
}

export default Todo;
