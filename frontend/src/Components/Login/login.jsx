import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import ButtonComponent from "../Button/Button.component";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Login Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", "true");
    dispatch(authActions.login()); // Update Redux Store
    setIsLoggedIn(true); // Update Local State

    navigate("/todo"); // Redirect to ToDo Page
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forget">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forget Password?</a>
          </div>
          <ButtonComponent
            type="submit"
            text="Sign In"
            className="w-100 mt-3"
            variant="dark"
          />
          <div className="register-link">
            <p>
              Don't have an account?
              <Link to="/signup"> Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
