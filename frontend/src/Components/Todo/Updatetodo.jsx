import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Updatetodo.css";
import { handleError, handleSuccess } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import ValidationError from "../../Validation/ValidationError";
import ButtonComponent from "../Button/Button.component";
import { updateTodo } from "../../api/todo";

function UpdateTodo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { todoid, title, description } = location.state || {};
  const Token = localStorage.getItem("token");

  const [inputs, setInputs] = useState({
    title: title || "",
    description: description || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const clearInputs = () => {
    setInputs({ title: "", description: "" });
  };

  const submitTodo = async () => {
    // e.preventDefault();
    const { title, description } = inputs;
    if (!ValidationError.isTodoValidate(title, description, setError)) {
      return;
    }
    try {
      // const response = await axios.put(
      //   `http://localhost:3006/api/todos/updatetodo/${todoid}`,
      //   { title, description },
      //   { headers: { Authorization: `Bearer ${Token}` } }
      // );
      await updateTodo(`${todoid}`, { title, description });
      handleSuccess("Todo updated successfully!");

      navigate("/todo");
    } catch (err) {
      handleError(err.response.data.message);
    }
  };

  return (
    <>
      <div className="todo">
        <div className="center-container">
          <div className="row">
            <div className="col-lg-4">
              <div className="todo-card">
                <h6 className="todo-form-title">Update todo</h6>
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
                  />
                  <ButtonComponent
                    className="btn-submit"
                    onClick={submitTodo}
                    text="Update"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateTodo;
