import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { showToast } from "../../utils/utils";
import { FaUser, FaEnvelope, FaPencilAlt } from "react-icons/fa";
import { updateUser, deleteUser } from "../../api/user";
import ValidationError from "../../Validation/ValidationError";
import ResponseHandler from "../../api/ResponseHandler/ResponseHandler";
import { Modal, Button } from "react-bootstrap";
import InputFields from "../common/Input/inputfields";
import ProgressBtn from "../common/Progressbar/progressbar";
import ErrorMessage from "../common/Error/errormsg";
import { FaCamera } from "react-icons/fa";

const userId = localStorage.getItem("id");

function Profile({ setIsLoggedIn }) {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

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
      let response = await updateUser({ profile, username, email });
      showToast("Profile updated successfully", "success");
      localStorage.setItem("Username", response.data.user.username);
      localStorage.setItem("Email", response.data.user.email);
      navigate("/profile");
    } catch (err) {
      ResponseHandler.error(err);
    }
    setIsTouched(false);
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setIsTouched(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile(imageUrl);
    }
  };

  const handleDeleteAccount = async () => {
    setShowConfirmDialog(true);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      showToast("User deleted successfully", "success");
      localStorage.clear();
      navigate("/login");
      setIsLoggedIn(false);
    } catch (err) {
      ResponseHandler.error(err);
    }
    setShowConfirmDialog(false);
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <h1>My Account</h1>

        {/* Profile Image Container */}
        <div className="profile-image-container">
          {profile ? (
            <img src={profile} alt="Profile" className="profile-image" />
          ) : (
            <div className="default-profile">
              <FaUser className="default-user-icon" />
            </div>
          )}
          <label htmlFor="fileInput" className="edit-icon">
            <FaCamera />
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <form onSubmit={handleUpdate}>
          <InputFields
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange(setUsername)}
            icon={FaUser}
          />
          <InputFields
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange(setEmail)}
            icon={FaEnvelope}
          />
          <ErrorMessage error={error} />
          <ProgressBtn type="submit" text="Update" className="w-100 mt-3" variant="dark" />
          <ProgressBtn type="button" text="Close your account" className="w-100 mt-3" variant="danger" onClick={handleDeleteAccount} />
        </form>
      </div>

      {/* Confirmation Dialog for Delete */}
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
