import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import profileImg from "../../assets/profile.png";
import ButtonComponent from "../Button/Button.component";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("Username");
    localStorage.removeItem("Email");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowDropdown(false);
    navigate("/profile");
  };


  // Toggle dropdown :-
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close dropdown:-
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <h4 className="logo">Todo App</h4>

        <div className="nav-buttons">
          {!isLoggedIn ? (
            <button className="nav-button" onClick={() => navigate("/login")}>
              Sign In
            </button>
          ) : (
            <>
              <button
                className="create-todo-btn"
                onClick={() => {
                  navigate("/todo");
                }}
              >
                Create Todo
              </button>
              <button
                className="create-todo-btn"
                onClick={() => {
                  navigate("/addtodo");
                }}
              >
                Add
              </button>
              <div className="profile-dropdown" ref={dropdownRef}>
                <button className="profile-btn" onClick={toggleDropdown}>
                  <img src={profileImg} alt="Profile" className="profile-img" />
                </button>
                <div className={`dropdown-menu ${showDropdown ? "active" : ""}`}
                >
                  <button onClick={handleProfileClick}>My Account</button>
                  <button>Change Password</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
