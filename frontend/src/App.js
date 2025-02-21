import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/login";
import Signup from "./Components/Signup/signup";
import Profile from "./Components/Profile/profile";
import Todo from "./Components/Todo/Todo.component";
import UpdateTodo from "./Components/Todo/Updatetodo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div className="container">
        <Routes>
          {" "}
          {}
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/updatetodo" element={<UpdateTodo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/todo" element={<Todo />} />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <h1>Welcome Home</h1>
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
