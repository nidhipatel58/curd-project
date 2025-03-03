import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Profile/profile.css";
import { handleSuccess } from "../../utils/utils";
import ButtonComponent from "../Button/Button.component";
import { changePassword } from "../../api/user";
import ValidationError from "../../Validation/ValidationError";
import ResponseHandler from "../../api/ResponseHandler/ResponseHandler";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Profile() {
  const [currentpassword, setCurrentPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmnewpassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPass, SetshowNewPass] = useState(false);
  const [showconfirm, SetshowConfirm] = useState(false)

  const navigate = useNavigate();
  const [isTouched, setIsTouched] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!ValidationError.isValidateChangePassword(currentpassword, newpassword, confirmnewpassword, setError)) {
      return;
    }
    try {
      let response = await changePassword({ currentpassword, newpassword });
      handleSuccess("Password changed successfully");
      console.log(response.data);
      navigate("/todo");
    } catch (err) {
      ResponseHandler.error(err);
    }
    setIsTouched(false);
    setError("");
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setIsTouched(true);
  };

  useEffect(() => {
    if (isTouched) {
      if (!ValidationError.isValidateChangePassword(currentpassword, newpassword, confirmnewpassword, setError)) {
        return;
      }
    }
  }, [currentpassword, newpassword, confirmnewpassword]);



  return (
    <div className="wrapper">
      <div className="form-box login">
        <form onSubmit={handleChangePassword}>
          <h1>Change Password</h1>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentpassword}
              onChange={handleChange(setCurrentPassword)}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="input-box">
            <input
              type={showNewPass ? "text" : "password"}
              placeholder="New Password"
              onChange={handleChange(setNewPassword)}
              value={newpassword}
            />
            <span
              className="password-toggle"
              onClick={() => SetshowNewPass(!showNewPass)}
            >
              {showNewPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="input-box">
            <input
              type={showconfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              onChange={handleChange(setConfirmNewPassword)}
              value={confirmnewpassword}
            />
            <span
              className="password-toggle"
              onClick={() => SetshowConfirm(!showconfirm)}
            >
              {showconfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {error && <span className="error">{error}</span>}
          <ButtonComponent
            type="submit"
            text="Submit"
            className="w-100 mt-3"
            variant="dark"
          />
        </form>
      </div>
    </div>
  );
}

export default Profile;
