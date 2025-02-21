import React, { useEffect, useState } from "react";
import ButtonComponent from "../Button/Button.component";
import axios from "axios";
import "./Updatetodo.css";
import { handleError, handleSuccess } from "../../utils/utils";
import { ToastContainer } from "react-toastify";
let Token = localStorage.getItem("token");
console.log(Token, "-----------Token");
let id = localStorage.getItem("id");
console.log(id, "-------------id");

function UpdateTodo() {
  const [Title, setTitle] = useState("");
  const [Description, setDes] = useState("");

  let Updatetodo = async (e) => {
    let Token = localStorage.getItem("token");
    let id = localStorage.getItem("id");
    e.preventDefault();
    // try {
    if (id) {
      let response = await axios.put(
        `http://localhost:3006/api/todos/updatetodo/${id}`,
        {
          Title,
          Description,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      handleSuccess("Your Todo Update Successfully!");
      console.log(response.data);
      localStorage.setItem("Title", response.data.user.title);
      localStorage.setItem("Description", response.data.user.description);
    } else {
      console.log("todo update fail!!");
    }
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="center-container">
          <div className="row">
            <div className="col-lg-4">
              <div className="todo-card">
                <h6 className="todo-form-title">#Update Your todo</h6>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  className="form-input"
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  name="description"
                  placeholder="Enter description"
                  className="form-input"
                  value={Description}
                  onChange={(e) => setDes(e.target.value)}
                />
                {/* {error && <span className="error">{error}</span>} */}
                <div className="button-group">
                  <button className="btn-clear">Close</button>
                  <button className="btn-submit" onClick={Updatetodo}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateTodo;
