import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import ButtonComponent from "../Button/Button.component";
import { useDispatch } from "react-redux";
// import { authActions } from "../../store";
import { handleError, handleSuccess } from "../../utils/utils";
import ApiConstants from "../../config/apiconstant";
import ValidationError from "../../Validation/ValidationError";

function Login({ setIsLoggedIn, setShowAuthPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // Handle Login Submit:
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validation Inputs:-
    if (!ValidationError.isLoginValidate(email, password, setError)) {
      return;
    }
    try {
      const response = await axios.post(ApiConstants.LOGIN, {
        email,
        password,
      });
      handleSuccess("Login Successfully");
      console.log(response.data);
      setTimeout(() => {
        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.user.id);
          localStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);
          //navigate("/todo");
        } else {
          handleError("Login failed");
        }
      }, 1000);
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="input-box">
            <input
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
          {error && <span className="error">{error}</span>}
          <ButtonComponent
            type="submit"
            text="Sign In"
            className="w-100 mt-3"
            variant="dark"
          />
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <span
                className="signup-link"
                onClick={() => setShowAuthPage("signup")}
                style={{
                  color: "black",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                SignUp
              </span>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
