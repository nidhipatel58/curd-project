import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Todo.css";
import { showToast } from "../../utils/utils";
import ValidationError from "../../Validation/ValidationError";
import { getTodo, createTodo, deleteTodo, updateTodo } from "../../api/todo";
import ButtonComponent from "../common/Button/Button.component"
import ResponseHandler from "../../api/ResponseHandler/ResponseHandler";
import InputFields from "../common/Input/inputfields"

let AddTodo = () => {
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
    setIsTouched(false);
    setError("");
  };

  const submitTodo = async () => {
    const { title, description } = inputs;
    if (!ValidationError.isTodoValidate(inputs.title, inputs.description, setError)) {
      return;
    }

    try {
      await createTodo({ title, description });
      showToast("Todo created successfully", "success");
      navigate("/todo");
    } catch (err) {
      ResponseHandler.error(err);
    }

    setInputs({ title: "", description: "" });
    setIsTouched(false);
    setError("");
  };

  return (
    <div className="todo">
      <div className="center-container">
        <div className="row">
          <div className="col-lg-4">
            <div className="todo-card">
              <h6 className="todo-form-title">
                Add New Todo
              </h6>
              <InputFields
                type="text"
                name="title"
                placeholder="Enter title"
                className="form-input"
                value={inputs.title}
                onChange={handleChange}
                maxLength={50}
              />
              <textarea
                name="description"
                placeholder="Enter description"
                className="form-input"
                value={inputs.description}
                onChange={handleChange}
                maxLength={100}
              />
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                marginTop: "5px",
                padding: "0 5px",
                minHeight: "16px"
              }}>
                <span style={{ color: "red", fontSize: "14px", visibility: error ? "visible" : "hidden" }}>
                  {error || "Placeholder"}
                </span>
              </div>


              <div className="button-group">
                <ButtonComponent
                  className="btn-clear"
                  text="Clear"
                  onClick={clearInputs}
                  disabled={!(inputs.title && inputs.description)}
                  style={{
                    cursor: !(inputs.title && inputs.description)
                      ? "not-allowed"
                      : "pointer",
                    opacity: !(inputs.title && inputs.description) ? 0.8 : 1,
                  }}
                />
                <ButtonComponent
                  className="btn-submit"
                  onClick={submitTodo}
                  text="Add"
                  disabled={!inputs.title || !inputs.description}
                  style={{
                    cursor:
                      !inputs.title || !inputs.description
                        ? "not-allowed"
                        : "pointer",
                    opacity: !inputs.title || !inputs.description ? 0.8 : 1,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
