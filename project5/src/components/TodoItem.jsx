import React from "react";

export default function TodoItem({ todo }) {
  return (
    <li>
      <input type="checkbox" checked={todo.completed} readOnly />
      <span style={{ marginLeft: "8px" }}>
        #{todo.id} - {todo.title}
      </span>
    </li>
  );
}
