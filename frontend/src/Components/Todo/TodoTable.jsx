import React from "react";
import "./Todo.css";
import ButtonComponent from "../Button/Button.component";

function TodoTable({
  handleDelete,
  Title,
  Description,
  id,
  updateId,
  toBeUpdate,
  handleUpdate,
}) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{Title}</td>
      <td>{Description}</td>
      <td className="action-cell">
        <ButtonComponent
          className="action-btn update-btn"
          onClick={() => toBeUpdate(updateId)}
          // onClick={() => handleUpdate(updateId)}
          text="Update"
        />
        <ButtonComponent
          className="action-btn delete-btn"
          onClick={() => handleDelete(id)}
          text="Delete"
        />
        {/* <ButtonComponent
          className="action-btn delete-btn"
          onClick={() => handleUpdate(updateId)}
          text="Edit"
        /> */}
      </td>
    </tr>
  );
}

export default TodoTable;
