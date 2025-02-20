import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils/utils";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import ButtonComponent from "../Button/Button.component";
import ApiConstants from "../../config/apiconstant";
import ValidationError from "../../Validation/ValidationError";
import { ToastContainer } from "react-toastify";

function Signup({ setShowAuthPage, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      !ValidationError.isSignupValidate(username, email, password, setError)
    ) {
      return;
    }
    try {
      let response = await axios.post(ApiConstants.REGISTER, {
        username,
        email,
        password,
      });
      handleSuccess("Registration Successful!");
      console.log(response.data);
      navigate("/login");
    } catch (err) {
      if (err.response.data && err.response.status === 400) {
        handleError(err.response.data.message);
      }
      handleError(err.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <form onSubmit={handleSignup}>
          <h1>Signup</h1>
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
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
            />
            <FaLock className="icon" />
          </div>
          {error && <span className="error">{error}</span>}
          <ButtonComponent
            type="submit"
            text="Signup"
            className="w-100 mt-3"
            variant="dark"
          />

          <div className="register-link">
            <p>
              Already have an account?{" "}
              <span
                className="login-link"
                onClick={() => navigate("/login")}
                style={{
                  color: "black",
                  cursor: "pointer",
                }}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
