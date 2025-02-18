import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Login from "./Components/Login/login";
import Signup from "./Components/Signup/signup";
import { Navbar } from "./Components/Navbar/Navbar";
// import Todo from "./Components/Todo/Todo";
import Todo from "./Components/Todo/Todo.component";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { authActions } from "./store";

function App() {
  // let dispatch = useDispatch();
  // useEffect(() => {
  // console.log(localStorage.getItem("id"));
  // let id = localStorage.getItem("id");
  // if (id) {
  //   dispatch(authActions.login());
  // }
  // });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/todo" element={<Todo />}></Route>
      </Routes>
    </div>
  );
}

export default App;
