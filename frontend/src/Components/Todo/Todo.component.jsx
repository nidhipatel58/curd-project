import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "./Todo.css";
import { handleError, handleSuccess } from "../../utils/utils";
import axios from "axios";
import TodoCards from "./TodoCards";
import Update from "./Update";
let Token = localStorage.getItem("Token");
console.log("Token------", Token);
let id = localStorage.getItem("id");
console.log(id, "id-----");
let toUpdateArray = [];

function Todo() {
  let [Inputs, setInput] = useState({
    title: "",
    description: "",
  });
  let [Array, setArray] = useState([]);

  // Get User Todo By Id and Token:-
  useEffect(() => {
    if (id) {
      let fetch = async () => {
        await axios
          .get(`http://localhost:3003/api/todos/gettodo/${id}`, {
            headers: {
              Authorization: `${Token}`,
            },
          })
          .then((response) => {
            setArray(response.data.todo);
          });
      };
      fetch();
    } else {
      handleError("Please Signup First!");
    }
  });

  // Target Value:-
  let handleChange = (e) => {
    let { name, value } = e.target;
    let copyinput = { ...Inputs };
    copyinput[name] = value;
    setInput(copyinput);
  };

  // console.log("Inputs-------------", Inputs);
  let Submit = async (e) => {
    e.preventDefault(); // Prevent from page refresh
    let { title, description } = Inputs;
    if (title === "" || description === "") {
      handleError("Title and discription should not be Empty");
    } else if (id) {
      // Create Todo:-
      let response = await axios.post(
        "http://localhost:3003/api/todos/create",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `${Token}`,
          },
        }
      );
      setInput({ title: "", description: "" });
      handleSuccess("Your Task is Added!");
      handleSuccess("Todo Created Successfully!");
      console.log(response.data);
    } else {
      setArray([...Array, Inputs]);
      setInput({ title: "", description: "" });
      handleSuccess("Your Task is Added!");
      handleError("Your Task is not Added! Please Signup!");
    }
  };

  // Update Form :-
  let dis = (value) => {
    console.log(value);
    document.getElementById("todo-update").style.display = value;
  };
  // Update User Todo By Id and Token:-
  let update = (value) => {
    toUpdateArray = Array[value];
    // console.log(Array[value]);
  };

  // Delete User Todo With Id and Token:-
  let del = async (id) => {
    console.log(id);
    if (id) {
      await axios
        .delete(`http://localhost:3003/api/todos/deletetodo/${id}`, {
          headers: {
            Authorization: `${Token}`,
          },
          data: { id: id },
        })
        .then(() => handleSuccess("Your Task Deleted Successfully!"));
    } else {
      handleError("Please Signup First!");
    }
  };

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main conatiner d-flex justify-content-center align-items-center">
          <div className="flex-column input-todo">
            <input
              type="text"
              placeholder="Title"
              className="my-3 mx-3 mt-5"
              name="title"
              onChange={handleChange}
            />
            <textarea
              type="text"
              placeholder="Discription"
              className="mx-3"
              name="description"
              onChange={handleChange}
            />
            <div className="todo-btn d-flex justify-content-end align-items-center">
              <button
                className="w-25 p-2 mt-3 px-4 border border-0"
                type="submit"
                onClick={Submit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row justify-content-center mt-5">
              {Array &&
                Array.map((items, index) => (
                  <div className="col-lg-3 mx-4 my-2" key={index}>
                    <TodoCards
                      title={items.title}
                      description={items.description}
                      id={items.id}
                      delid={del}
                      display={dis}
                      updateId={index}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo">
        <div className="container todo-update" id="todo-update">
          <Update display={dis} update={toUpdateArray} />
        </div>
      </div>
    </>
  );
}

export default Todo;
