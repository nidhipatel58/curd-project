import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiLock, FiPlusCircle, FiList, FiLogIn } from "react-icons/fi"; // Added Sign In icon
import { FaTasks } from "react-icons/fa"; // Logo icon
import profileImg from "../../assets/profile.png";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);
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
        {/* Logo with icon */}
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
