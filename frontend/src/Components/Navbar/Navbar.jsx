import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import profileImg from "../../assets/profile.png"; // Add a default profile image

const Navbar = ({ isLoggedIn, setShowAuthPage, setIsLoggedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <h4>Todo App</h4>
      <ul className="nav-links">
        {!isLoggedIn ? (
          <>
            <li>
              <button onClick={() => setShowAuthPage("login")}>Sign In</button>
            </li>
            <li>
              <button onClick={() => setShowAuthPage("signup")}>Sign Up</button>
            </li>
          </>
        ) : (
          <li className="profile-dropdown">
            <button className="profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
              <img src={profileImg} alt="Profile" className="profile-img" />
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button >My Account</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
