import React from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa"; // Updated icons
import "./Todo.css";

function TodoTable({ handleDelete, Title, Description, id, updateId, toBeUpdate, handleEdit }) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{Title}</td>
      <td>{Description}</td>
      <td className="action-cell">
        <button className="action-btn update-btn" onClick={() => toBeUpdate(updateId)}>
          Update
        </button>
        <button className="action-btn delete-btn" onClick={() => handleDelete(id)}>
          Delete
        </button>
        <button className="action-btn edit-btn" onClick={() => handleEdit(updateId)}>
           Edit
        </button>
      </td>
    </tr>
  );
}

export default TodoTable;
