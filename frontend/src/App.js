import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
    const restrictedRoutes = ["/login", "/signup"];

    if (loggedIn && restrictedRoutes.includes(location.pathname)) {
      navigate("/todo");
    }
  }, [navigate, location.pathname]);

  return (
    <div className="App">
      <>
        <ToastContainer />
      </>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addtodo" element={<Addtodo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/updatetodo" element={<UpdateTodo />} />
          <Route path="/todo" element={<Todo />} />
          <Route
            path="/"
            element={
              isLoggedIn ? <Todo /> : <Login setIsLoggedIn={setIsLoggedIn} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
