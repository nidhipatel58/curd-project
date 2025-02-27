import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import ButtonComponent from "../Button/Button.component";
import { handleError, handleSuccess } from "../../utils/utils";
import ValidationError from "../../Validation/ValidationError";
import { login } from "../../api/user";
import Progressbtn from "../Progressbar/progressbar";
import ResponseHandler from "../../api/ResponseHandler/ResponseHandler";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const stopLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ValidationError.isLoginValidate(email, password, setError)) {
      return;
    }
    try {
      setLoading(true);
      const response = await login({ email, password })
      handleSuccess("Login Successfully");
      console.log(response.data);
      setEmail("");
      setPassword("");
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.user.id);
        localStorage.setItem("Username", response.data.user.username);
        localStorage.setItem("Email", response.data.user.email);
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        navigate("/todo");
      } else {
        handleError("Login failed");
      }
    } catch (err) {
      ResponseHandler.error(err);
    }
    finally {
      stopLoading();
    }
  };
  // useEffect(() => {
  //   if (!ValidationError.isLoginValidate(email, password, setError)) {
  //     return;
  //   }
  // }, [email, password]);

  return (
    <div className="wrapper">
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="input-box">
            <FaUser className="icon" />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="remember-forget">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forget Password?</a>
          </div>
          {error && <span className="error">{error}</span>}
          <Progressbtn
            type="submit"
            text="Sign In"
            className="w-100 mt-3"
            variant="dark"
            loading={loading}
          />
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <span
                className="signup-link"
                onClick={() => navigate("/signup")}
                style={{ color: "black", cursor: "pointer", textDecoration: "underline" }}
              >
                SignUp
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;