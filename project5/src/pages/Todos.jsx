import React, { useEffect, useState } from "react";
import { getTodos, updateTodo, deleteTodo } from "../services/todosService";
import TodoItem from "../components/TodoItem"; 

export default function Todos() {
  const [todos, setTodos] = useState([]);


  const handleSave = async (updatedTodo) => {
    console.log("got todo in Todos:", updatedTodo);
    try {
        await updateTodo(updatedTodo);
        setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
        } catch (err) {
            console.error("Failed to update todo", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
        } catch (err) {
            console.error("Failed to delete todo", err);
        }
    };

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
          <TodoItem
            key={todo.id}
            todo={todo}
            onSave={handleSave}
            onDelete={handleDelete}
          />

        ))}
      </ul>
    </div>
  );
}
