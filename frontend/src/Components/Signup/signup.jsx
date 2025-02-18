import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils/utils";
import ButtonComponent from "../Button/Button.component";

function Signup() {
  const [signup, setsignup] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e.target, "--------");
    let { name, value } = e.target;
    // console.log("-----", name, value);
    let copysignup = { ...signup };
    copysignup[name] = value;
    setsignup(copysignup);
  };
  console.log("signup---------", signup);

  const handleSignup = async (e) => {
    e.preventDefault();
    let { username, email, password } = signup;
    if (!username || !email || !password) {
      return handleError("Username, email, and password are required");
    }
    try {
      let response = await axios.post(
        "http://localhost:3003/api/user/register",
        {
          username,
          email,
          password,
        }
      );
      handleSuccess("Registration Successfull!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      console.log(response.data);
    } catch (err) {
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
              placeholder="Username:"
              required
              onChange={handleChange}
              name="username"
              value={signup.username}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email:"
              required
              onChange={handleChange}
              name="email"
              value={signup.email}
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password:"
              required
              onChange={handleChange}
              name="password"
              value={signup.password}
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forget">
            <label htmlFor="">
              <input type="checkbox" /> I agree to the terms and conditions
            </label>
          </div>
          <ButtonComponent
            type="submit"
            text="Signup"
            className="w-100 mt-3"
            variant="outline-light"
          />

          <div className="register-link">
            <p>
              Have an account?
              <Link to="/login"> Login</Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
