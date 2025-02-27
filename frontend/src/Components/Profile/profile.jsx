import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils/utils";
import { FaUser, FaEnvelope } from "react-icons/fa";
import ButtonComponent from "../Button/Button.component";
import { updateUser, deleteUser } from "../../api/user";
import ValidationError from "../../Validation/ValidationError";
import ResponseHandler from "../../api/ResponseHandler/ResponseHandler";
import { Modal, Button } from "react-bootstrap";
import { getTodo, createTodo, deleteTodo, updateTodo } from "../../api/todo";
const userId = localStorage.getItem("id");

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [todoArray, setTodoArray] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    let StoreUser = localStorage.getItem("Username");
    let StoreEmail = localStorage.getItem("Email");

    if (StoreUser) {
      setUsername(StoreUser);
    }
    if (StoreEmail) {
      setEmail(StoreEmail);
    }
    fetchTodos();
  }, []);


  const fetchTodos = async () => {
    try {
      const response = await getTodo();
      let data = response.data.todo;
      if (data.length != 0) {
        setTodoArray(response.data.todo || []);
      }
    } catch (err) {
      ResponseHandler.error("fetch err");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!ValidationError.isProfileValidate(username, email, setError)) {
      return;
    }
    try {
      let response = await updateUser({ username, email });
      handleSuccess("Profile updated successfully");
      localStorage.setItem("Username", response.data.user.username);
      localStorage.setItem("Email", response.data.user.email);
      navigate("/profile");
    } catch (err) {
      ResponseHandler.error(err);
    }
  };
  // useEffect(() => {
  //   if (!ValidationError.isProfileValidate(username, email, setError)) {
  //     return;
  //   }
  // }, [username, email])

  const handleDeleteAccount = async () => {
    if (todoArray.length != 0) {
      handleError("Can’t delete yourself as todos exist in your bucket");
    }
    else {
      setShowConfirmDialog(true);
    }
  };

  const handleDeleteUser = async () => {
    try {
      let response = await deleteUser();
      handleSuccess("User deleted successfulyy")
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("Username");
      localStorage.removeItem("Email");
      navigate("/login");
    } catch (err) {
      ResponseHandler.error(err);
    }
  };


  return (
    <div className="wrapper">
      <div className="form-box login">
        <form onSubmit={handleUpdate}>
          <h1>My Account</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
            />
            <FaEnvelope className="icon" />
          </div>
          {error && <span className="error">{error}</span>}
          <ButtonComponent
            type="submit"
            text="Update"
            className="w-100 mt-3"
            variant="dark"
          />
          <ButtonComponent
            type="button"
            text="Close your account"
            className="w-100 mt-3"
            variant="danger"
            onClick={handleDeleteAccount}
          />
        </form>
      </div>
      <Modal show={showConfirmDialog} onHide={() => setShowConfirmDialog(false)} centered>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteUser}>Yes</Button>
          <Button variant="secondary" onClick={() => setShowConfirmDialog(false)}>No</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
