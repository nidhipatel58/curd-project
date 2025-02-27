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

    const clearInputs = () => {
        setInputs({ title: "", description: "" });
        setIsUpdating(false);
        setUpdateId(null);
    };

    const submitTodo = async () => {
        const { title, description } = inputs;
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
                navigate("/todo")
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

    return (
        <div className="todo">
            <div className="center-container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="todo-card">
                            <h6 className="todo-form-title">
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
                </div>
            </div>
        </div>


    );

}

export default AddTodo;