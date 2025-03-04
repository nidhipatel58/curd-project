import React from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import "../../Todo/Todo.css";
import ButtonComponent from "../Button/Button.component";

function TodoTable({ handleDelete, Title, Description, id, updateId, toBeUpdate, handleEdit }) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{Title}</td>
      <td>{Description}</td>
      <td className="action-cell">
        <ButtonComponent className="action-btn update-btn" onClick={() => toBeUpdate(updateId)} text="Update" />
        <ButtonComponent className="action-btn delete-btn" onClick={() => handleDelete(id)} text="Delete" />
        <ButtonComponent className="action-btn edit-btn" onClick={() => handleEdit(updateId)} text="Edit" />
      </td>
    </tr>
  );
}

export default TodoTable;
