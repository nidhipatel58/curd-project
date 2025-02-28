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

let AddTodo = () => {
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const Token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (isTouched) {
      if (
        !ValidationError.isTodoValidate(
          inputs.title,
          inputs.description,
          setError
        )
      ) {
        return;
      }
    }
  }, [inputs.title, inputs.description]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setIsTouched(true);
  };

  const clearInputs = () => {
    setInputs({ title: "", description: "" });
  };

  const submitTodo = async () => {
    const { title, description } = inputs;
    if (!ValidationError.isTodoValidate(inputs.title,inputs.description,setError)) {
      return;
    }

    try {
      await createTodo({ title, description });
      handleSuccess("Todo created successfully");
      navigate("/todo");
      setInputs({ title: "", description: "" });
    } catch (err) {
      ResponseHandler.error(err);
    }
  };

  return (
    <div className="todo">
      <div className="center-container">
        <div className="row">
          <div className="col-lg-4">
            <div className="todo-card">
              <h6 className="todo-form-title"></h6>
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
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
