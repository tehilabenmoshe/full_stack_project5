import React, { useEffect, useState } from "react";
import { getTodos } from "../services/todosService";
import TodoItem from "../components/TodoItem"; 

export default function Todos() {
  const [todos, setTodos] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;


  useEffect(() => {
    if (userId) {
      getTodos(userId).then(setTodos).catch((err) => {
        console.error("Failed to load todos:", err);
      });
    }
  }, [userId]);

  return (
    <div>
      <h2>My Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            <span style={{ marginLeft: "8px" }}>
              #{todo.id} - {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
