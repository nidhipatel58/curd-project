import React from "react";
import "./Todo.css";

function TodoTable({
  handleDelete,
  Title,
  Description,
  id,
  updateId,
  toBeUpdate,
}) {
  return (
    <tr key={id}>
      <td>{updateId + 1}</td>
      <td>{Title}</td>
      <td>{Description}</td>
      <td className="action-cell">
        <button
          className="action-btn update-btn"
          onClick={() => toBeUpdate(updateId)}
        >
          Update
        </button>
        <button
          className="action-btn delete-btn"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TodoTable;
