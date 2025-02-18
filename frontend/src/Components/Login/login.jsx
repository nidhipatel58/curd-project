import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils/utils";
import { ToastContainer } from "react-toastify";
import ButtonComponent from "../Button/Button.component";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let handleSubmit = async (e) => {
    e.preventDefault(); // Prevent from page refresh
    try {
      let response = await axios.post("http://localhost:3003/api/user/login", {
        email,
        password,
      });

      handleSuccess("Login Successfull!");
      setTimeout(() => {
        navigate("/todo");
      }, 1000);

      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.user.id);
      dispatch(authActions.login());
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
          <h1>SignIn</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email:"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password:"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forget">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a> Forget Password</a>
          </div>
          <ButtonComponent
            type="submit"
            text="SignIn"
            className="w-100 mt-3"
            variant="outline-light"
          />
          <div className="register-link">
            <p>
              Don't have an account?
              <Link to="/signup"> Signup</Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
