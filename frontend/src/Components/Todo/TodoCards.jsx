import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";

function TodoCards({
  title,
  description,
  display,
  delid,
  id,
  updateId,
  toBeUpdate,
}) {
  return (
    <div className="todocard p-3">
      <div>
        <h1>{title}</h1>
        <p className="todo-text">{description}</p>
      </div>
      <div className="d-flex justify-content-around">
        <div
          className="d-flex justify-content-center align-item-center card-icon-head px-3 py-2 text-white"
          onClick={() => {
            display("block");
            // console.log(updateId);
            toBeUpdate(updateId);
          }}
        >
          <GrDocumentUpdate className="cards-icon del" />
          &nbsp;Update
        </div>
        <div
          className="d-flex justify-content-center align-item-center card-icon-head px-3 py-2 text-white"
          onClick={() => {
            console.log(id, "deleted id-------");
            delid(id);
          }}
        >
          <AiFillDelete className="cards-icon del" />
          &nbsp;Delete
        </div>
      </div>
    </div>
  );
}

export default TodoCards;
