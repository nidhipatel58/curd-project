import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiLock, FiPlusCircle, FiList, FiLogIn } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import profileImg from "../../assets/profile.png";
import "./Navbar.css";
import "./ResponsiveNav.css"

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "theme-light");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowDropdown(false);
    navigate("/profile");
  };

  const handleChangePasswordClick = () => {
    setShowDropdown(false);
    navigate("/changepassword");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };


  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "theme-dark" ? "theme-light" : "theme-dark"
    );
  }

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
        <div className="logo">
          <FaTasks className="logo-icon" />
          <span className="gradient-text">Todo</span>
        </div>

        <div className="nav-buttons">
          {!isLoggedIn ? (
            <button className="nav-btn" onClick={() => navigate("/login")}>
              <FiLogIn className="icon" /> <span>Sign In</span>
            </button>
          ) : (
            <>
              <button id="switcher" onClick={handleTheme}>
                <svg className="icon-light" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path>
                </svg>
                <svg className="icon-dark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path>
                </svg>
              </button>
              <button className="nav-btn" onClick={() => navigate("/todo")}>
                <FiList className="icon" /> <span>Create Todo</span>
              </button>
              <button className="nav-btn" onClick={() => navigate("/addtodo")}>
                <FiPlusCircle className="icon" /> <span>Add</span>
              </button>
              <div className="profile-dropdown" ref={dropdownRef}>
                <button className="profile-btn" onClick={toggleDropdown}>
                  <img src={profileImg} alt="Profile" className="profile-img" />
                </button>
                <div className={`dropdown-menu ${showDropdown ? "active" : ""}`}>
                  <button className="dropdown-item" onClick={handleProfileClick}>
                    <FiUser className="icon" /> My Account
                  </button>
                  <button className="dropdown-item" onClick={handleChangePasswordClick}>
                    <FiLock className="icon" /> Change Password
                  </button>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    <FiLogOut className="icon" /> Logout
                  </button>
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
