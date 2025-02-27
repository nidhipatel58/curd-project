import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/login";
import Signup from "./Components/Signup/signup";
import Profile from "./Components/Profile/profile";
import Todo from "./Components/Todo/Todo.component";
import UpdateTodo from "./Components/Todo/Updatetodo";
import Addtodo from "./Components/Todo/Addtodo";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // Redirect logged-in users away from login/signup
    if (loggedIn && ["/login", "/signup"].includes(location.pathname)) {
      navigate("/todo");
    }
  }, [navigate, location.pathname]);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/todo" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/todo" replace /> : <Signup />} />

          {/* Private Routes: Redirect if not logged in */}
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/addtodo" element={isLoggedIn ? <Addtodo /> : <Navigate to="/login" replace />} />
          <Route path="/updatetodo" element={isLoggedIn ? <UpdateTodo /> : <Navigate to="/login" replace />} />
          <Route path="/todo" element={isLoggedIn ? <Todo /> : <Navigate to="/login" replace />} />

          {/* Redirect based on login status */}
          <Route path="/" element={isLoggedIn ? <Navigate to="/todo" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
