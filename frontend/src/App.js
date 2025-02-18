import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/login";
import Signup from "./Components/Signup/signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthPage, setShowAuthPage] = useState("login"); // Default to login

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setShowAuthPage={setShowAuthPage} setIsLoggedIn={setIsLoggedIn} />

      <div className="container">
        {/* Show Sign In or Sign Up below Navbar when not logged in */}
        {!isLoggedIn && showAuthPage === "login" && <Login setIsLoggedIn={setIsLoggedIn} setShowAuthPage={setShowAuthPage} />}
        {!isLoggedIn && showAuthPage === "signup" && <Signup setIsLoggedIn={setIsLoggedIn} setShowAuthPage={setShowAuthPage} />}
      </div>
    </div>
  );
}

export default App;
