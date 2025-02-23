import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils/utils";
import { FaUser, FaEnvelope } from "react-icons/fa";
import ButtonComponent from "../Button/Button.component";
import ApiConstants from "../../config/apiconstant";
import ValidationError from "../../Validation/ValidationError";
import { ToastContainer } from "react-toastify";
let Token = localStorage.getItem("token");
console.log(Token, "-----------Token");
let id = localStorage.getItem("id");
console.log(id, "-------------id");

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
     const [error, setError] = useState("");
   const navigate = useNavigate();

  useEffect(() => {
    let StoreUser = localStorage.getItem("Username");
    let StoreEmail = localStorage.getItem("Email");

    if (StoreUser) {
      setUsername(StoreUser);
    }
    if (StoreEmail) {
      setEmail(StoreEmail);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!ValidationError.isProfileValidate(username, email, setError)) {
      return;
    }
    try {
      let response = await axios.put(
        `http://localhost:3006/api/user/updateuser`,
        {
          username,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      handleSuccess("Profile Update Successfully");
      console.log(response.data);
      localStorage.setItem("Username", response.data.user.username);
      localStorage.setItem("Email", response.data.user.email);
      navigate("/todo")
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
        </form>
      </div>
    </div>
  );
}

export default Profile;
