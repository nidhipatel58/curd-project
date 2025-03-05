import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Profile/profile.css";
import { showToast } from "../../utils/utils";
import { changePassword } from "../../api/user";
import ValidationError from "../../Validation/ValidationError";
import ResponseHandler from "../../api/ResponseHandler/ResponseHandler";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputFields from "../common/Input/inputfields";
import ProgressBtn from "../common/Progressbar/progressbar";
import PasswordField from "../common/Input/passwordfield";

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
      showToast("Password changed successfully", "success");
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
            <PasswordField
              type={showPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentpassword}
              onChange={handleChange(setCurrentPassword)}
              showPassword={showPassword}
              togglePasswordVisibility={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="input-box">
            <PasswordField
              type={showNewPass ? "text" : "password"}
              placeholder="New Password"
              onChange={handleChange(setNewPassword)}
              value={newpassword}
              showPassword={showNewPass}
              togglePasswordVisibility={() => SetshowNewPass(!showNewPass)}
            />
          </div>
          <div className="input-box">
            <PasswordField
              type={showconfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              onChange={handleChange(setConfirmNewPassword)}
              value={confirmnewpassword}
              showPassword={showconfirm}
              togglePasswordVisibility={() => SetshowConfirm(!showconfirm)}
            />
          </div>
          {error && <span className="error">{error}</span>}
          <ProgressBtn
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
