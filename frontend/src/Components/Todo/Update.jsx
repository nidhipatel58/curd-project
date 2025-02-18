import React, { useEffect, useState } from "react";
import ButtonComponent from "../Button/Button.component";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils/utils";
let Token = localStorage.getItem("Token");

function Update({ display, update }) {
  useEffect(() => {
    setInput({ title: update.title, description: update.description });
  }, [update]);

  let [Inputs, setInput] = useState({
    title: "",
    description: "",
  });
  let change = (e) => {
    let { name, value } = e.target;
    setInput({ ...Inputs, [name]: value });
  };
  const Submit = async () => {
    // console.log(Inputs);
    display("none");
    if (Token) {
      await axios
        .put(
          `http://localhost:3003/api/todos/updatetodo/${update.id}`,
          {
            title: Inputs.title,
            description: Inputs.description,
          },
          {
            headers: {
              Authorization: `${Token}`,
            },
          }
        )
        .then(() => handleSuccess("Task Updated Successfully!"));
    } else {
      handleError("Please Signup First!");
    }
  };
  return (
    <div className="todo p-5 d-flex justify-content-center align-items-center flex-column">
      <h3>Update Your Task</h3>
      <input
        type="text"
        placeholder="Title"
        className="todo-input  w-50 p-3"
        name="title"
        value={Inputs.title}
        onChange={change}
      />
      <textarea
        placeholder="Description"
        className="todo-input w-50 p-3 mt-3"
        name="description"
        value={Inputs.description}
        onChange={change}
      />
      <div className="update-btn d-flex">
        <ButtonComponent
          type="submit"
          text="Update"
          className="btn btn-dark my-4 mx-4 px-4 py-2"
          onClick={Submit}
        />
        <ButtonComponent
          type="submit"
          text="Close"
          className="btn btn-dark my-4 mx-2 px-4 py-2"
          onClick={() => display("none")}
        />
      </div>
    </div>
  );
}

export default Update;
