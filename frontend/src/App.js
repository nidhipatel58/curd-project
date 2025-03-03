import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/login";
import Signup from "./Components/Signup/signup";
import Profile from "./Components/Profile/profile";
import ChangePassword from "./Components/changepassword/changepassword";
import Todo from "./Components/Todo/Todo.component";
import UpdateTodo from "./Components/Todo/Updatetodo";
import Addtodo from "./Components/Todo/Addtodo";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/todo" replace />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/todo" replace /> : <Signup />}
          />

          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <Profile setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/changepassword"
            element={
              isLoggedIn ? <ChangePassword /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/addtodo"
            element={
              isLoggedIn ? <Addtodo /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/updatetodo"
            element={
              isLoggedIn ? <UpdateTodo /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/todo"
            element={isLoggedIn ? <Todo /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/todo" : "/login"} replace />}
          />

          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/todo" : "/login"} replace />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
