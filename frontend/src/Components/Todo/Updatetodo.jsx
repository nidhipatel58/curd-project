import React, { useEffect, useState } from "react";
import "./Todo.css";
import { showToast } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import ValidationError from "../../Validation/ValidationError";
import ButtonComponent from "../common/Button/Button.component";
import { updateTodo } from "../../api/todo";
import InputFields from "../common/Input/inputfields"

function UpdateTodo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { todoid, title, description } = location.state || {};
  const [isTouched, setIsTouched] = useState(false);

  const [inputs, setInputs] = useState({
    title: title || "",
    description: description || "",
  });
  const [error, setError] = useState("");

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
    setError("")
  };

  const submitTodo = async () => {
    const { title, description } = inputs;
    try {
      if (
        !ValidationError.isTodoValidate(
          inputs.title,
          inputs.description,
          setError
        )
      ) {
        return;
      }
      await updateTodo(`${todoid}`, { title, description });
      showToast("Todo updated successfully!", "success");

      navigate("/todo");
    } catch (err) {
      showToast(err.response.data.message, "error");
    }
    setIsTouched(false);
    setError("")
  };

  return (
    <>
      <div className="todo">
        <div className="center-container">
          <div className="row">
            <div className="col-lg-4">
              <div className="todo-card">
                <h6 className="todo-form-title">Update todo</h6>
                <InputFields
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
